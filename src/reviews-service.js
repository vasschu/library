import reviewsData from './../data/reviews-data.js';
import reviewsError from './../common/error-messages/review-errors.js';

const getAllBookReviews = async (bookId) => {
    const reviews = await reviewsData.getBookReviews(bookId);

    if (!reviews[0]) {
        return {message: reviewsError.NO_REVIEWS_FOR_BOOK,
                status: 404};
    }
    console.log(reviews);
    return reviews;
};


const postReview = async (body) => {
	return await reviewsData.postBookReview(body);
};

const getReviewById = async (id) => {
    const review = await reviewsData.getReview(id);

    if(!review){
        return null;
    }

    return review;
};

const updateReviewById = async (reviewid, body) => {
    const {title, content, users_id} = body;

    const review = await getReviewById(reviewid);

    if(!review[0]){
        return {message: reviewsError.NO_SUCH_REVIEW,
                status: 404};
    }
    
	const [{id, user_id}] = review;

    if(user_id !== users_id){
        return {message: reviewsError.OTHER_USER_REVIEW,
                status: 400};
    }
    
    const update = await reviewsData.updateReview(id, title, content);

    if(!update.affectedRows){
        return {message: reviewsError.NO_DATABASE_CHANGES,
                status: 400};
    }

    return update;

};

const getBookById = async (id) => {
    const book = await reviewsData.getBookById(id);

    if(!book){
        return null;
    }

    return book;
};

const deleteReviewById = async (reviewid, body, bookId) => {
    const { users_id } = body;

    const book = await getBookById(bookId);

    if(!book[0]){
        return { message: reviewsError.NO_SUCH_BOOK,
                 status: 404};
    }

    const review = book.find(obj => +obj.review_id === +reviewid);
    
    if (!review) {
        return {message: reviewsError.NO_SUCH_REVIEW,
                status: 404};
    }

	const {review_id, user_id} = review;

    if(+user_id !== +users_id){
        return {message: reviewsError.OTHER_USER_REVIEW,
                status: 400};
    }
    
    const update = await reviewsData.deleteReview(review_id);

    if(!update.affectedRows){
        return {message: reviewsError.NO_DATABASE_CHANGES,
                status: 400};
    }

    return update;

};


export default {
    getAllBookReviews,
    postReview,
    getReviewById,
    updateReviewById,
    deleteReviewById,
};
