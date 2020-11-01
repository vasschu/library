import http from './http-common.js';
import axios from 'axios';

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

const deleteUser = (id) => {
	const res = axios({
		method: 'delete',
		url: 'http://localhost:5500/users',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			Accept: 'application/json, text/plain, */*',
		},
		data: { user_id: id },
	});

	return res;
};

const banUser = (data) => {
	return http.put('/users/', data);
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
