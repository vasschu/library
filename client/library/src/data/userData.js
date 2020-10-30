import http from './http-common.js';

const registerUser = (data) => {
	return http.post('/users', data);
};

const loginUser = (data) => {
	return http.post('/auth/session', data);
};

const logoutUser = () => {
	return http.delete('/auth/session');
};

const userPoints = () => {
	return http.get('/users');
};

const userBorrowdBooksHisotry = () => {
	return http.get('/users/history');
};

export default {
	registerUser,
	loginUser,
	logoutUser,
	userPoints,
	userBorrowdBooksHisotry,
};
