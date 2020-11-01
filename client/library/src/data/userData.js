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

const deleteUser = () => {
	return http.delete('/users/');
};

const banUser = () => {
	return http.put('/users/');
};

const getAllUser = () => {
	return http.get('/users/allusers');
};

export default {
	registerUser,
	loginUser,
	logoutUser,
	userPoints,
	userBorrowdBooksHisotry,
	deleteUser,
	banUser,
	getAllUser,
};
