import reviewsData from '../data/reviews-data.js';
import reviewsError from '../common/error-messages/review-errors.js';

const getAllBookReviews = async (bookId) => {
	const reviews = await reviewsData.getBookReviews(bookId);

	if (!reviews[0]) {
		return reviewsError.NOT_FOUND;
	}
	return reviews;
};

const postReview = async (body) => {
	return await reviewsData.postBookReview(body);
};

const getReviewById = async (id) => {
	const review = await reviewsData.getReview(id);

	if (!review) {
		return null;
	}

	return review;
};

const updateReviewById = async (reviewid, body, role) => {
	const { title, content, users_id } = body;

	const review = await getReviewById(reviewid);

	if (!review[0]) {
		return reviewsError.NOT_FOUND;
	}

	const [{ id, user_id }] = review;

	if (role === 'admin' || +user_id === +users_id) {
		const update = await reviewsData.updateReview(id, title, content);

		if (!update.affectedRows) {
			return reviewsError.NO_DATABASE_CHANGES;
		}
		return update;
	}

	return reviewsError.NOT_PERMITTED;
};

const getBookById = async (id) => {
	const book = await reviewsData.getBookById(id);

	if (!book) {
		return null;
	}

	return book;
};

const deleteReviewById = async (reviewid, body, bookId, role) => {
	const { users_id } = body;

	const book = await getBookById(bookId);

	if (!book[0]) {
		return reviewsError.NOT_FOUND;
	}

	const review = book.find((obj) => +obj.review_id === +reviewid);

	if (!review) {
		return reviewsError.NOT_FOUND;
	}
	const { review_id, user_id } = review;

	if (role === 'admin' || +user_id === +users_id) {
		const update = await reviewsData.deleteReview(review_id);

		if (!update.affectedRows) {
			return reviewsError.NO_DATABASE_CHANGES;
		}

		return update;
	} else if (+user_id !== +users_id) {
		return reviewsError.NOT_PERMITTED;
	}
};

const rateReviewById = async (review_id, user_id, rating) => {
	const hasThisUserRatedThis = await reviewsData.getReviewLikes(
		review_id,
		user_id,
	);

	if (hasThisUserRatedThis[0] && hasThisUserRatedThis[0].rating === +rating) {
		console.log('duplicate entry');
		return { error: reviewsError.DUPLICATE_RECORD, result: null };
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
		return {
			error: null,
			result: { message: `You ${+rating ? 'liked' : 'disliked'} this review` },
		};
	}
};

export default {
	getAllBookReviews,
	postReview,
	getReviewById,
	updateReviewById,
	deleteReviewById,
	rateReviewById,
};
