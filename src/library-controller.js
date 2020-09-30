import express from 'express';
import libraryService from './library-service.js';
import reviewsService from './reviews-service.js';

const libraryController = express.Router();

// common string parameters - we can add common file to collect those. Will make the code pretty clean
const tableBooks = 'books';

libraryController
	// get all books
	.get('/', async (req, res) => {
		if (typeof req.query.search === 'string' && req.query.search) {
			const books = await libraryService.filterBooksByName(
				tableBooks,
				req.query.search,
			);

			res.status(200).send(books);
		} else {
			const books = await libraryService.getAllRecords(tableBooks);

			res.status(200).send(books);
		}
	})

	// view details for indivudal book by ID
	.get('/:id', async (req, res) => {
		const { id } = req.params;
		const book = await libraryService.getBookById(tableBooks, +id);
		if (!book[0]) {
			return res.status(404).send({
				message: 'Book is not found with this ID!',
			});
		}

		res.status(200).send(book);
	})

	//get reviews for specific book by ID
	.get('/:id/reviews', async (req, res) => {
		const { id } = req.params;
		const reviews = await reviewsService.getAllBookReviews(id);

		res.status(200).send(reviews);
	})

	//post review to specific book by ID
	.post('/:id/reviews', async (req, res) => {
		const body = req.body;
		// console.log(body);
		const reviews = await reviewsService.postReview(body);

		res.status(200).send(reviews);
	});

export default libraryController;
