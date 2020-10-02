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
    console.log(review[0]);

    if(!review[0]){
        return {Message: 'Something went wrong'};
    }
    
	const [{id, user_id}] = review;

    if(user_id !== users_id){
        return {Message: 'You can not edit other users\' reviews'};
    }
    
    const update = await reviewsData.updateReview(id, title, content);

    if(!update.affectedRows){
        return null;
    }
    console.log(update);
    return update;

};

const deleteReviewById = async (reviewid, body, bookId) => {
    const { users_id } = body;

    const review = await getReviewById(reviewid);
    console.log(review[0]);

    if(!review[0]){
        return { Message: 'No review with this id' };
    }

	const [{id, user_id, book_id}] = review;

    if(+user_id !== +users_id){
        return {Message: 'You can not edit other users\' reviews'};
    }

    if(+book_id !== +bookId){
        return {Message: 'This is not the correct book'};
    }
    
    const update = await reviewsData.deleteReview(id);

    if(!update.affectedRows){
        return null;
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
