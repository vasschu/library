import express from 'express';
import reviewsService from '../service/reviews-service.js';
import serviceErrors from '../common/error-messages/service-errors.js';
import { validateBody } from '../middleware/body-validator.js';
import { reviewShema } from '../middleware/validators/create-review.js';
import { rateReviewSchema } from './../middleware/validators/rate-review-schema.js';
import { updateReviewShema } from '../middleware/validators/update-review.js';
import {
	authMiddleware,
	tokenExtract,
	tokenIsBlacklisted,
	roleMiddleware,
	isBannedMiddleware,
} from '../auth/auth-middleware.js';

const reviewsController = express.Router();
reviewsController.use(authMiddleware);
reviewsController.use(roleMiddleware('regular', 'admin'));
reviewsController.use(tokenExtract());
reviewsController.use(tokenIsBlacklisted());

reviewsController
	/**
	 * Get reviews for specific book
	 * @param {number} book_id from req.params
	 * @return {object} return object with all reviews or error msg
	 */
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

	/**
	 * Post review to specific book
	 * @param {string} title from req.body {title}
	 * @param {string} content from req.body {content}
	 * @param {number} users_id from req.body {users_id}
	 * @param {number} books_id from req.body {books_id}
	 * @return {object} return message with user details or error message
	 */
	.post(
		'/:id/reviews',
		isBannedMiddleware(),
		validateBody(reviewShema),
		async (req, res) => {
			try {
				const body = req.body;
				const { id } = req.params;
				const reviews = await reviewsService.postReview(body, req.user.id, id);

				if (reviews.error === serviceErrors.DUPLICATE_RECORD) {
					return res.status(400).send({
						message: 'You have already posted a review for this book',
					});
				}

				res.status(201).send(reviews.result);
			} catch (err) {
				throw new Error(err);
			}
		},
	)

	/**
	 * Update review to specific book
	 * @param {number} review_id from req.params {:reviewid}
	 * @param {string} title from req.body {title}
	 * @param {string} content from req.body {content}
	 * @param {number} users_id from req.body {users_id}
	 * @param {number} books_id from req.body {books_id}
	 * @return {object} return message if the update is ok.
	 */
	.put(
		'/:id/reviews/:reviewid',
		isBannedMiddleware(),
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

				res
					.status(200)
					.send({ message: 'The review was updated successfully' });
			} catch (err) {
				throw new Error(err);
			}
		},
	)
	/**
	 * Delete review for specific book
	 * @param {number} review_id from req.params {:reviewid}
	 * @param {string} title from req.body {title}
	 * @param {string} content from req.body {content}
	 * @param {number} users_id from req.body {users_id}
	 * @param {number} books_id from req.body {books_id}
	 * @return {object} return message if the delete was done.
	 */
	.delete('/:id/reviews/:reviewid', async (req, res) => {
		try {
			const { id, reviewid } = req.params;
			const { role } = req.user;

			const update = await reviewsService.deleteReviewById(
				reviewid,
				req.user.id,
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

			res.status(200).send(update.result);
		} catch (err) {
			throw new Error(err);
		}
	})
	/**
	 * like/dislike review for specific book
	 * @param {number} review_id from req.params {:reviewid}
	 * @param {number} rating from req.body, should be 0 for dislike, 1 for like {rating}
	 * @param {number} user_id from req.body {user_id}
	 * @return {object} return message if the delete was done.
	 */
	.post(
		'/:id/reviews/:reviewid',
		validateBody(rateReviewSchema),
		isBannedMiddleware(),
		async (req, res) => {
			const { rating } = req.body;
			const { reviewid } = req.params;
			const reviewRating = await reviewsService.rateReviewById(
				reviewid,
				req.user.id,
				rating,
				req.user.role,
			);

			const { error, result, level } = reviewRating;
			if (!error) {
				res.status(200).send({ res: result, level: level });
			} else {
				res.status(404).send({ message: 'This is duplicate review.' });
			}
		},
	);

export default reviewsController;
