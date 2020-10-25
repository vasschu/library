import http from './http-common.js';

const getReviews = (id) => {
	return http.get(`/books/${id}/reviews`);
};

// const create = (body) => {
// 	return http.post('/books', body);
// };

// const getBookById = (id) => {
// 	return http.get(`/books/${id}`);
// };

// const getBookRating = (id) => {
// 	return http.get(`/books/${id}/rate`);
// };

// const deleteBook = (id) => {
// 	return http.delete(`/books/${id}`);
// };

// const borrowBook = (id) => {
// 	return http.post(`/books/${id}`);
// };

// const returnBook = (id) => {
// 	return http.patch(`/books/${id}`);
// };

// const editBook = (id, body) => {
// 	return http.put(`/books/${id}`, body);
// };

export default { getReviews };
