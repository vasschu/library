import reviewsData from './../data/reviews-data.js';

const getAllBookReviews = async (bookId) => {
    const reviews = await reviewsData.getBookReviews(bookId);

    if (!reviews[0]) {
        return null;
    }
    console.log(reviews);
    return reviews;
};


const postReview = async (body) => {
	return await reviewsData.postBookReview(body);
};

export default {
    getAllBookReviews,
    postReview,
};
