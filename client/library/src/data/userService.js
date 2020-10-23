import http from './http-common.js';

const registerUser = (data) => {
	return http.post('/register', data);
};

const loginUser = (data) => {
	return http.post('/auth/session', data);
};

export default {
	registerUser,
	loginUser,
};
