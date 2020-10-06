import express from 'express';
import libraryService from '../service/library-service.js';
import { validateBody } from '../middleware/body-validator.js';
import borrowBookShema from './../validators/borrow-book-shema.js';

import { authMiddleware } from '../auth/auth-middleware.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const libraryController = express.Router();
libraryController.use(authMiddleware);
libraryController.use(roleMiddleware('regular', 'admin'));

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

	.post('/', roleMiddleware('admin'), async (req, res) => {

		const createBook = await libraryService.createBook(req.body);

		return res.status(201).send(createBook);
	});

export default libraryController;
