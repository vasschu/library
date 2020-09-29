import express from 'express';
import libraryService from './library-service.js';

const libraryController = express.Router();

libraryController
	// get all books
	.get('/', async (req, res) => {
		console.log('route get all');
		const books = await libraryService.getAllBooks('books');

		res.status(200).send(books);
	});

export default libraryController;
