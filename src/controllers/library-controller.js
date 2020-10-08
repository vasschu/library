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
} from '../auth/auth-middleware.js';
import serviceErrors from '../common/error-messages/service-errors.js';

const libraryController = express.Router();
libraryController.use(authMiddleware);
libraryController.use(roleMiddleware('regular', 'admin'));
libraryController.use(tokenExtract());
libraryController.use(tokenIsBlacklisted());

libraryController
	// get all books
	.get('/', async (req, res) => {
		const { search } = req.query;

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

	// view details for individual book by ID
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

	//borrow book by id
	.post('/:id', validateBody(borrowBookShema), async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const borrowedBook = await libraryService.borrowBook(id, userId);

		const { error, result } = borrowedBook;

		if (!error) {
			res.status(201).send(result);
		} else {
			res.status(403).send({
				message: 'This book is currently borrowed. Will be available later.',
			});
		}
	})

	//return book by id
	.delete('/:id', validateBody(borrowBookShema), async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const bookToReturn = await libraryService.returnBook(id, userId);

		const { error, result } = bookToReturn;

		if (!error) {
			res.status(201).send(result);
		} else {
			res.status(403).send({
				message: 'This book is not borrowed by this user.',
			});
		}
	})

	.post(
		'/',
		roleMiddleware('admin'),
		validateBody(createBook),
		async (req, res) => {
			const createBook = await libraryService.createBook(req.body);

			if (createBook.error === serviceErrors.NO_DATABASE_CHANGES) {
				res.status(400).send({ message: 'Couldn\'t create book'});
			}

			return res.status(201).send(createBook.result);
		},
	)

	.put(
		'/:id',
		roleMiddleware('admin'),
		validateBody(updateBook),
		async (req, res) => {
			const { id } = req.params;
			const body = req.body;

			const update = await libraryService.updateBook(id, body);

			if (update.error === serviceErrors.NO_DATABASE_CHANGES) {
				return res.status(400).send({ messages: 'Update was unsuccessful' });
			}

			return res.status(200).send(update.result);
		},
	)

	.delete('/:id/temp', roleMiddleware('admin'), async (req, res) => {
		const { id } = req.params;

		const del = await libraryService.deleteBook(id);

		if (del.error === serviceErrors.NO_DATABASE_CHANGES) {
			return res.status(400).send({ messages: 'Delete was unsuccessful' });
		}

		return res.status(200).send({ message: 'Deleted successfully' });
	})
	
	.put('/:id/rate', validateBody(rateBookSchema), async (req, res) => {
		const { id } = req.params;
		const user = req.user;
		const { rating } = req.body;

		console.log(user);
		const rate = await libraryService.rateBook(id, user, rating);

		if (rate.error === serviceErrors.NOT_FOUND) {
			res.status(404).send({ message: 'You need to borrow the book before you rate it' });
		} else if (rate.error === serviceErrors.NOT_PERMITTED) {
			res.status(400).send({ message: 'You need to review the book before you rate it'});
		} else if (rate.error === serviceErrors.NO_DATABASE_CHANGES) {
			res.status(400).send({ message: 'Rating was unsuccessfull'});
		}

		return res.status(200).send({ messages: 'Rated successfully'});
	});

export default libraryController;
