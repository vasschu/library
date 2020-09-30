import express from 'express';
import libraryService from './library-service.js';

const libraryController = express.Router();

libraryController
	// get all books
	.get('/', async (req, res) => {
		if (typeof req.query.search === 'string' && req.query.search) {
			const books = await libraryService.filterBooksByName(
				'books',
				req.query.search,
			);

			res.status(200).send(books);
		} else {
			const books = await libraryService.getAllRecords('books');

			res.status(200).send(books);
		}
	});

export default libraryController;
