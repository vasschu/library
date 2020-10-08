import express from 'express';
import reviewsService from '../service/reviews-service.js';
import serviceErrors from '../common/error-messages/service-errors.js';
import { validateBody } from '../middleware/body-validator.js';
import { reviewShema } from '../middleware/validators/create-review.js';
import { updateReviewShema } from '../middleware/validators/update-review.js';
import { deleteReviewShema } from '../middleware/validators/delete-review.js';
import {
	authMiddleware,
	tokenExtract,
	tokenIsBlacklisted,
	roleMiddleware,
} from '../auth/auth-middleware.js';

const reviewsController = express.Router();
reviewsController.use(authMiddleware);
reviewsController.use(roleMiddleware('regular', 'admin'));
reviewsController.use(tokenExtract());
reviewsController.use(tokenIsBlacklisted());

reviewsController
	//get reviews for specific book by ID
	.get('/:id/reviews', async (req, res) => {
		try {
			const { id } = req.params;

			const reviews = await reviewsService.getAllBookReviews(id);

			if (reviews.error === serviceErrors.NOT_FOUND) {
				return res
					.status(404)
					.send({ message: 'No reviews found for this book' });
			}

			res.status(200).send(reviews.result);
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
				const { role, sub } = req.user;

				const update = await reviewsService.updateReviewById(
					reviewid,
					body,
					role,
					sub,
				);

				if (update.error === serviceErrors.NOT_FOUND) {
					return res.status(404).send({ мessage: 'No review found' });
				} else if (update.error === serviceErrors.NOT_PERMITTED) {
					return res.status(403).send({
						мessage: 'You can not edit other reviews by other people',
					});
				} else if (update.error === serviceErrors.NO_DATABASE_CHANGES) {
					return res
						.status(400)
						.send({ message: 'Changes were not made on the review' });
				}

				res.status(200).send({message: 'The review was updated successfully'});
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

				if (update.error === serviceErrors.NOT_FOUND) {
					return res.status(404).send({ мessage: 'No such resourse found' });
				} else if (update.error === serviceErrors.NOT_PERMITTED) {
					return res
						.status(403)
						.send({ мessage: 'You can not delete reviews by other users' });
				} else if (update.error === serviceErrors.NO_DATABASE_CHANGES) {
					return res.status(400).send({ message: 'Review was not deleted' });
				}

				res
					.status(200)
					.send(update.result);
			} catch (err) {
				throw new Error(err);
			}
		},
	)
	//like dislike review.
	.post('/:id/reviews/:reviewid', async (req, res) => {
		const { rating, user_id } = req.body;
		const { reviewid } = req.params;
		const reviewRating = await reviewsService.rateReviewById(
			reviewid,
			user_id,
			rating,
		);

		const { error, result } = reviewRating;
		if (!error) {
			res.status(200).send(result);
		} else {
			res.status(404).send({ message: 'This is duplicate review.' });
		}
	});

export default reviewsController;
