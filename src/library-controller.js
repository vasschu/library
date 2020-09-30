import express from 'express';
import libraryService from './library-service.js';
import reviewsService from './reviews-service.js';

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
	})

	.get('/:id/reviews', async (req, res) => {
		const { id }= req.params;
		const reviews = await reviewsService.getAllBookReviews(id);

		res.status(200).send(reviews);
	})

	.post('/:id/reviews', async (req, res) => {
		const body = req.body;
		// console.log(body);
		const reviews = await reviewsService.postReview(body);

		res.status(200).send(reviews);
		
	});

export default libraryController;
