import express from 'express';
import libraryService from '../service/library-service.js';
import { validateBody } from '../middleware/body-validator.js';
import borrowBookShema from '../middleware/validators/borrow-book-shema.js';
import { createBook } from '../middleware/validators/create-book.js';
import { updateBook } from '../middleware/validators/update-book.js';
import { rateBookSchema } from '../middleware/validators/rate-book-schema.js';
import {
	authMiddleware,
	roleMiddleware,
	tokenExtract,
	tokenIsBlacklisted,
	isBannedMiddleware,
} from '../auth/auth-middleware.js';
import serviceErrors from '../common/error-messages/service-errors.js';

const libraryController = express.Router();
libraryController.use(authMiddleware);
libraryController.use(
	roleMiddleware(
		'regular',
		'admin',
		'powerReader',
		'masterReader',
		'moderator',
	),
);
libraryController.use(tokenExtract());
libraryController.use(tokenIsBlacklisted());

libraryController
	/**
	 * Get all books
	 * @param {string} search(optional) from req.query finds books by book name
	 * @return {object} return 'error' if no books found or array containing book objects {"id","title","author","borrowed","is_unlisted"}
	 */
	.get('/', async (req, res) => {
		const search = req.query.search;
		let booksToShow = '';
		if (search) {
			booksToShow = await libraryService.filterBooksByName(search);
		} else {
			booksToShow = await libraryService.getAllRecords();
		}
		const { error, result } = booksToShow;
		if (!error) {
			res.status(200).send(result);
		} else {
			res.status(404).send({ message: 'No books found.' });
		}
	})

	/**
	 * View individual book by ID
	 * @param {number} id from the http
	 * @return {object} return 'error' if no books found or array containing book info {"id","title","author","borrowed","is_unlisted"}
	 */
	.get('/:id', async (req, res) => {
		const { id } = req.params;
		const booksToShow = await libraryService.getBookById(+id);

		const { error, result } = booksToShow;
		if (!error) {
			res.status(200).send(result);
		} else {
			res.status(404).send({ message: 'No books found with this ID.' });
		}
	})

	/**
	 * Borrow book by ID
	 * @param {number} book_id from the http
	 * @param {number} user_id from the req.body in format  {"users_id":"id"}
	 * @return {object} return message if book can't be borrowed or array containing the book info {"id","title","author","borrowed","is_unlisted"}
	 */
	.post(
		'/:id',
		isBannedMiddleware(),
		// validateBody(borrowBookShema),
		async (req, res) => {
			const { id } = req.params;
			// const userId = req.body.users_id;

			const borrowedBook = await libraryService.borrowBook(id, req.user.id);

			const { error, result } = borrowedBook;

			if (!error) {
				res.status(201).send(result);
			} else {
				res.status(403).send({
					message: 'This book is currently borrowed. Will be available later.',
				});
			}
		},
	)

	/**
	 * Return book by ID
	 * @param {number} book_id from the http
	 * @param {number} user_id from the req.body in format  {"users_id":"id"}
	 * @return {object} return message if book can't be returned or array containing the book info {"id","title","author","borrowed","is_unlisted"}
	 */
	.patch('/:id', validateBody(borrowBookShema), async (req, res) => {
		const { id } = req.params;

		// const userId = req.body.users_id;
		const { username } = req.user;

		const bookToReturn = await libraryService.returnBook(id, req.user.id, username);

		const { error, result, level } = await bookToReturn;
		if (!error) {
			res.status(201).send({ res: result, level: level });
		} else {
			res.status(403).send({
				message: 'This book is not borrowed by this user.',
			});
		}
	})

	/**
	 * Add new book (admin only)
	 * @param {string} title from req.body {title:}
	 * @param {string} author from req.body {author:}
	 * @param {string} image from req.body {image:}
	 * @param {string} description from the req.body in format  {"description":"id"}
	 * @return {object} return message if book can't be created or the new book {"id","title","author","borrowed","is_unlisted"}
	 */
	.post(
		'/',
		roleMiddleware('admin'),
		validateBody(createBook),
		async (req, res) => {
			const createBook = await libraryService.createBook(req.body);

			if (createBook.error === serviceErrors.NO_DATABASE_CHANGES) {
				res.status(400).send({ message: 'Could not create book' });
			}

			return res.status(201).send(createBook.result);
		},
	)

	/**
	 * Edit book (admin only)
	 * @param {string} title from req.body {title:}
	 * @param {string} author from req.body {author:}
	 * @param {string} image from req.body {image:}
	 * @param {string} description from the req.body in format  {"description":"id"}
	 * @return {object} return message if book can't be created or the new book {"id","title","author","borrowed","is_unlisted"}
	 */
	.put(
		'/:id',
		roleMiddleware('admin'),
		validateBody(updateBook),
		async (req, res) => {
			const { id } = req.params;
			const body = req.body;
			const update = await libraryService.updateBook(id, body);

			if (update.error === serviceErrors.NO_DATABASE_CHANGES) {
				return res.status(400).send({ message: 'Update was unsuccessful' });
			}

			return res.status(200).send(update.result);
		},
	)

	/**
	 * Delete book (admin only)
	 * @param {number} id from http
	 * @return {object} return message if book is deleted*/
	.delete(
		'/:id/',
		// roleMiddleware('admin'),
		async (req, res) => {
			const { id } = req.params;

			const del = await libraryService.deleteBook(id);

			if (del.error === serviceErrors.NO_DATABASE_CHANGES) {
				return res.status(400).send({ message: 'Delete was unsuccessful' });
			}

			return res.status(200).send({ message: 'Deleted successfully' });
		},
	)

	/**
	 * Rate book
	 * @param {number} id from http
	 * @param {number} user_id from req.user {user}
	 * @param {number} rating from req.body {rating}
	 * @return {object} return message with the outcome of the operation
	 */
	.put(
		'/:id/rate',
		isBannedMiddleware(),
		validateBody(rateBookSchema),
		async (req, res) => {
			const { id } = req.params;
			const user = req.user;
			const { rating } = req.body;

			const rate = await libraryService.rateBook(id, user, rating);

			if (rate.error === serviceErrors.NOT_FOUND) {
				res
					.status(404)
					.send({ message: 'You need to borrow the book before you rate it' });
			} else if (rate.error === serviceErrors.NOT_PERMITTED) {
				res
					.status(400)
					.send({ message: 'You need to review the book before you rate it' });
			} else if (rate.error === serviceErrors.NO_DATABASE_CHANGES) {
				res.status(400).send({ message: 'Rating was unsuccessfull' });
			}

			return res.status(200).send({ message: rate.result, level: rate.level });
		},
	)

	.get('/:id/rate', async (req, res) => {
		const { id } = req.params;

		const rating = await libraryService.getAverageBookRating(id);

		return res.status(200).send({ rating });
	});

export default libraryController;
