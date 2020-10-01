import express from 'express';
import libraryService from './library-service.js';
import * as booksCommon from './../common/books-table-common.js';

const libraryController = express.Router();

libraryController
	// get all books
	.get('/', async (req, res) => {
		if (typeof req.query.search === 'string' && req.query.search) {
			const books = await libraryService.filterBooksByName(
				booksCommon.tableBooks,
				req.query.search,
			);
			res.status(200).send(books);
		} else {
			const books = await libraryService.getAllRecords(booksCommon.tableBooks);
			res.status(200).send(books);
		}
	})

	// view details for individual book by ID
	.get('/:id', async (req, res) => {
		const { id } = req.params;
		const book = await libraryService.getBookById(booksCommon.tableBooks, +id);
		if (!book[0]) {
			return res.status(404).send({
				message: 'Book is not found with this ID!',
			});
		}
		res.status(200).send(book);
	})

	//borrow book by id
	.post('/:id', async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const borrowedBook = await libraryService.borrowBook(id, userId);

		res.status(200).send(borrowedBook);
	})

	//return book by id
	.delete('/:id', async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const borrowedBook = await libraryService.returnBook(id, userId);

		res.status(200).send(borrowedBook);
	});

export default libraryController;
