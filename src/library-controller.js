import express from 'express';
import libraryService from './library-service.js';
import reviewsService from './reviews-service.js';
import * as booksCommon from './../common/books-table-common.js';


import {validateBody} from './middleware/body-validator.js';
import {reviewShema} from './validators/create-review.js';

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

	// view details for indivudal book by ID
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

	//borrow book by id - need to add parameter for userID
	.post('/:id', async (req, res) => {
		const { id } = req.params;
		const userId = req.body.userId;

		const borrowedBook = await libraryService.borrowBook(id, userId);

		res.status(200).send(borrowedBook);
	})

	//get reviews for specific book by ID
	.get('/:id/reviews', async (req, res) => {
		try {
			const { id } = req.params;

			const reviews = await reviewsService.getAllBookReviews(id);

			if (!reviews) {
				return res.status(404).send( {Message: 'No such reveiws'} );
			}
			
			res.status(200).send(reviews);

		} catch (err) {
			throw new Error(err);
		}
	})

	//post review to specific book by ID
	.post('/:id/reviews', validateBody(reviewShema), async (req, res) => {
		try {
		const body = req.body;

		const reviews = await reviewsService.postReview(body);

		res.status(201).send(reviews);

		} catch (err) {
			throw new Error(err);
		}
	});

export default libraryController;
