import reviewsData from './../data/reviews-data.js';

const getAllBookReviews = async (bookId) => {
	return await reviewsData.getBookReviews(bookId);
};


const postReview = async (body) => {
	return await reviewsData.postBookReview(body);
};

export default {
    getAllBookReviews,
    postReview,
};
