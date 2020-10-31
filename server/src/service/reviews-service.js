import reviewsData from '../data/reviews-data.js';
import serviceErrors from '../common/error-messages/service-errors.js';
import usersData from '../data/users-data.js';
import { changeLevel } from '../common/points-calculator.js';

/**
 * Get all reviews for a book
 * @param {number} bookId the id of the book
 * @returns {object} error and result key:value pairs. If there is no error,
 * result holds all reviews for the book.
 */
const getAllBookReviews = async (bookId) => {
	const reviews = await reviewsData.getBookReviews(bookId);

	if (!reviews[0]) {
		return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
	}
	return { error: null, result: reviews };
};

/**
 * Get a review by id
 * @param {number} id the id of the review
 * @returns {object} null || the review data
 */
const getReviewById = async (id) => {
	const review = await reviewsData.getReview(id);

	if (!review) {
		return null;
	}

	return review;
};

/**
 * Post a review
 * @param {object} body the review info to post
 * @param {number} userId the user posting the review's id
 * @param {number} bookId the book that is reviewed's id
 * @returns {object} error and result key:value pairs. If there is no error,
 * result holds the info for the posted review.
 */
const postReview = async (body, userId, bookId) => {
	const isReviewed = await reviewsData.getReviewByUser(bookId, userId);

	if (!isReviewed) {
		const res = await reviewsData.postBookReview(body, userId, bookId);
		const review = await getReviewById(res.insertId);

		return { error: null, result: review };
	} else {
		return { error: serviceErrors.DUPLICATE_RECORD, result: null };
	}
};

/**
 * Update a review
 * @param {number} reviewid the id of the review
 * @param {object} body the review info to update
 * @param {string} role the role of the user trying to update
 * @param {number} users_id the id of the user trying to update
 * @returns {object} error and result key:value pairs. If there is no error,
 * result holds the info for the update.
 */
const updateReviewById = async (reviewid, body, role, users_id) => {
	const review = await getReviewById(reviewid);

	if (!review) {
		return { error: serviceErrors.NOT_FOUND, result: null };
	}

	const title = body.title || review.title;
	const content = body.content || review.content;

	if (role === 'admin' || +review.user_id === +users_id) {
		const update = await reviewsData.updateReview(review.id, title, content);

		if (!update.affectedRows) {
			return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
		}
		const updatedReview = await getReviewById(reviewid);

		return { error: null, result: updatedReview };
	}

	return { error: serviceErrors.NOT_PERMITTED, result: null };
};

/**
 * Get a book by id
 * @param {number} id the id of the book
 * @returns {object} null || the book data
 */
const getBookById = async (id) => {
	const book = await reviewsData.getBookById(id);

	if (!book) {
		return null;
	}

	return book;
};

/**
 * Delete a review
 * @param {number} reviewid the id of the review
 * @param {number} userId the id of the user trying to delete
 * @param {number} bookId the id of the book the review belongs to
 * @param {string} role the role of the user trying to delete
 * @returns {object} error and result key:value pairs. If there is no error,
 * result holds the info for the deleted review.
 */
const deleteReviewById = async (reviewid, userId, bookId, role) => {
	const book = await getBookById(bookId);
	const reviewToDelete = await getReviewById(reviewid);

	if (!book[0]) {
		return { error: serviceErrors.NOT_FOUND, result: null };
	}

	const review = book.find((obj) => +obj.review_id === +reviewid);

	if (!review) {
		return { error: serviceErrors.NOT_FOUND, result: null };
	}
	const { review_id, user_id } = review;

	if (role === 'admin' || +user_id === +userId) {
		const update = await reviewsData.deleteReview(review_id);

		if (!update.affectedRows) {
			return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
		}

		return { error: null, result: reviewToDelete };
	} else if (+user_id !== +userId) {
		return { error: serviceErrors.NOT_PERMITTED, result: null };
	}
};

/**
 * Rate a review
 * @param {number} review_id the id of the review
 * @param {number} user_id the id of the user trying to rate the review
 * @param {number} rating the given rating
 * @returns {object} error and result key:value pairs. If there is no error,
 * result holds a success message.
 */
const rateReviewById = async (review_id, user_id, rating, username) => {
	const hasThisUserRatedThis = await reviewsData.getReviewLikes(
		review_id,
		user_id,
	);

	if (hasThisUserRatedThis[0] && hasThisUserRatedThis[0].rating === +rating) {
		return { error: serviceErrors.DUPLICATE_RECORD, result: null };
	} else if (
		hasThisUserRatedThis[0] &&
		hasThisUserRatedThis[0].rating !== +rating
	) {
		await reviewsData.updateReviewScore(hasThisUserRatedThis[0].id, rating);
		return {
			error: null,
			result: { message: 'You updated your review score' },
		};
	} else {
		await reviewsData.rateReview(review_id, user_id, rating);

		const { level } = await usersData.getWithRole(username);
		const changedLevel = await changeLevel(user_id, level);
		return {
			error: null,
			result: { message: `You ${+rating ? 'liked' : 'disliked'} this review` },
			level: changedLevel,
		};
	}
};

/**
 * get all review likes
 * @param {number} review_id the id of the review
 * @returns {object} containing all likes for the given review
 */
const getReviewLikes = async (review_id, user_id) => {
	const reviewLikes = await reviewsData.getReviewLikes(review_id, user_id);
	if (reviewLikes.length > 0) {
		return { error: null, result: reviewLikes };
	}
	return { error: serviceErrors.NOT_FOUND, result: null };
};

export default {
	getAllBookReviews,
	postReview,
	getReviewById,
	updateReviewById,
	deleteReviewById,
	rateReviewById,
	getReviewLikes,
};
