import http from './http-common.js';

const getReviews = (id) => {
	return http.get(`/books/${id}/reviews`);
};

const addReview = (id, data) => {
	return http.post(`/books/${id}/reviews`, data);
};

// const getBookById = (id) => {
// 	return http.get(`/books/${id}`);
// };

// const getBookRating = (id) => {
// 	return http.get(`/books/${id}/rate`);
// };

const deleteReview = (bookId, reviewId) => {
	return http.delete(`/books/${bookId}/reviews/${reviewId}`);
};

// const borrowBook = (id) => {
// 	return http.post(`/books/${id}`);
// };

// const returnBook = (id) => {
// 	return http.patch(`/books/${id}`);
// };

const editReview = (bookId, reviewId, data) => {
	return http.put(`/books/${bookId}/reviews/${reviewId}`, data);
};

export default { getReviews, addReview, deleteReview, editReview };
