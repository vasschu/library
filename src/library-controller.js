import express from 'express';
import libraryData from '../data/library-data.js';
import libraryService from './library-service.js';
// import * as books from './../common/books-table-common.js';

const libraryController = express.Router();

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
			res.status(200).send({ message: 'No books found.' });
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
			res.status(200).send({ message: 'No books found with this ID.' });
		}
	})

	//borrow book by id
	.post('/:id', async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const borrowedBook = await libraryService.borrowBook(id, userId);

		const { error, result } = borrowedBook;

		if (!error) {
			res.status(200).send(result);
		} else {
			res.status(200).send({
				message: 'This book is currently borrowed. Will be available later.',
			});
		}
	})

	//return book by id
	.delete('/:id', async (req, res) => {
		const { id } = req.params;
		const userId = req.body.users_id;

		const bookToReturn = await libraryService.returnBook(id, userId);

		const { error, result } = bookToReturn;

		if (!error) {
			res.status(200).send(result);
		} else {
			res.status(200).send({
				message: 'This book is not borrowed by this user.',
			});
		}
	});

//this is test controller with test function to apply more flexible search on the database.
// .get('/test', async (req, res) => {
// 	let result = await libraryData.getBorrowedBooksStatusByUser(2, null, null);
// 	res.status(200).send(result);
// });

export default libraryController;
