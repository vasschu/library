import reviewsData from '../data/reviews-data.js';
import serviceErrors from '../common/error-messages/service-errors.js';


const getAllBookReviews = async (bookId) => {
	const reviews = await reviewsData.getBookReviews(bookId);

	if (!reviews[0]) {
		return { error: serviceErrors.NO_DATABASE_CHANGES,
			result: null };
	}
	return { error: null,
		result: reviews };
};


const getReviewById = async (id) => {
	const review = await reviewsData.getReview(id);
	
	if (!review) {
		return null;
	}
	
	return review;
};

const postReview = async (body, userId, bookId) => {

	const isReviewed = await reviewsData.getReviewByUser(bookId, userId);

	if (!isReviewed){
		const res = await reviewsData.postBookReview(body, userId, bookId);
		const review = await getReviewById(res.insertId);

		return { error: null,
				result: review };
	} else {
		return { error: serviceErrors.DUPLICATE_RECORD,
				result: null };
	}
};

const updateReviewById = async (reviewid, body, role, users_id) => {
	const review = await getReviewById(reviewid);

	if (!review) {
		return { error: serviceErrors.NOT_FOUND,
			result: null };
	}

	const title = body.title || review.title;
	const content = body.content || review.content;

	if (role === 'admin' || +review.user_id === +users_id) {
		const update = await reviewsData.updateReview(review.id, title, content);

		if (!update.affectedRows) {
			return { error: serviceErrors.NO_DATABASE_CHANGES,
				result: null };
		}
		return { error: null,
			result: update };
	}

	return { error: serviceErrors.NOT_PERMITTED,
		result: null };
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
	const reviewToDelete = await getReviewById(reviewid);

	if (!book[0]) {
		return { error: serviceErrors.NOT_FOUND,
			result: null };
	}

	const review = book.find((obj) => +obj.review_id === +reviewid);

	if (!review) {
		return { error: serviceErrors.NOT_FOUND,
			result: null };
	}
	const { review_id, user_id } = review;

	if (role === 'admin' || +user_id === +users_id) {
		const update = await reviewsData.deleteReview(review_id);

		if (!update.affectedRows) {
			return { error: serviceErrors.NO_DATABASE_CHANGES,
				result: null };
		}

		return { error: null,
			result: reviewToDelete };

	} else if (+user_id !== +users_id) {
		return { error: serviceErrors.NOT_PERMITTED,
			result: null };
	}
};

const rateReviewById = async (review_id, user_id, rating) => {
	const hasThisUserRatedThis = await reviewsData.getReviewLikes(
		review_id,
		user_id,
	);

	if (hasThisUserRatedThis[0] && hasThisUserRatedThis[0].rating === +rating) {
		// console.log('duplicate entry');
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
