import http from './http-common.js';

const getReviews = (id) => {
	return http.get(`/books/${id}/reviews`);
};

const addReview = (id, data) => {
	return http.post(`/books/${id}/reviews`, data);
};

const deleteReview = (bookId, reviewId) => {
	return http.delete(`/books/${bookId}/reviews/${reviewId}`);
};

const editReview = (bookId, reviewId, data) => {
	return http.put(`/books/${bookId}/reviews/${reviewId}`, data);
};

const likeReviewRating = (bookId, reviewId, rating) => {
	return http.post(`/books/${bookId}/reviews/${reviewId}`, rating);
};

// const getBookRating = (id) => {
// 	return http.get(`/books/${id}/rate`);
// };
// const borrowBook = (id) => {
// 	return http.post(`/books/${id}`);
// };

// const returnBook = (id) => {
// 	return http.patch(`/books/${id}`);
// };

export default {
	getReviews,
	addReview,
	deleteReview,
	editReview,
	likeReviewRating,
};
