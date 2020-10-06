import express from 'express';
import reviewsService from '../service/reviews-service.js';
import reviewsError from '../common/error-messages/review-errors.js';

import { validateBody } from '../middleware/body-validator.js';
import { reviewShema } from '../validators/create-review.js';
import { updateReviewShema } from '../validators/update-review.js';
import { deleteReviewShema } from '../validators/delete-review.js';

import { authMiddleware } from '../auth/auth-middleware.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const reviewsController = express.Router();
reviewsController.use(authMiddleware);
reviewsController.use(roleMiddleware('regular', 'admin'));

reviewsController
	//get reviews for specific book by ID
	.get('/:id/reviews',  async (req, res) => {
		try {
			const { id } = req.params;

			const reviews = await reviewsService.getAllBookReviews(id);

			if (reviews === reviewsError.NOT_FOUND) {
				return res
					.status(404)
					.send({ message: 'No reviews found for this book' });
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
	})

	.put(
		'/:id/reviews/:reviewid',
		validateBody(updateReviewShema),
		async (req, res) => {
			try {
				const { reviewid } = req.params;
				const body = req.body;

				const update = await reviewsService.updateReviewById(reviewid, body);

				if (update === reviewsError.NOT_FOUND) {
					return res.status(404).send({ мessage: 'No review found' });
				} else if (update === reviewsError.NOT_PERMITTED) {
					return res
						.status(403)
						.send({ мessage: 'You can not edit other people\'s reviews' });
				} else if (update === reviewsError.NO_DATABASE_CHANGES) {
					return res
						.status(400)
						.send({ message: 'Changes were not made on the review' });
				}

				res.status(200).send(update);
			} catch (err) {
				throw new Error(err);
			}
		},
	)

	.delete(
		'/:id/reviews/:reviewid',
		validateBody(deleteReviewShema),
		async (req, res) => {
			try {
				const { id, reviewid } = req.params;
				const body = req.body;
				const { role } = req.user;

				const update = await reviewsService.deleteReviewById(
					reviewid,
					body,
					id,
					role,
				);

				if (update === reviewsError.NOT_FOUND) {
					return res.status(404).send({ мessage: 'No such resourse found' });
				} else if (update === reviewsError.NOT_PERMITTED) {
					return res
						.status(403)
						.send({ мessage: 'You can not delete other people\'s reviews' });
				} else if (update === reviewsError.NO_DATABASE_CHANGES) {
					return res.status(400).send({ message: 'Review was not deleted' });
				}

				res
					.status(200)
					.send({ message: 'The review was deleted successfully' });
			} catch (err) {
				throw new Error(err);
			}
		},
	);

export default reviewsController;
