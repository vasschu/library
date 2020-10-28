import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:5500/',
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
		Accept: 'application/json, text/plain, */*',
	},
});

http.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem('token');
		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default http;

// Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
// 	async (config) => {
// 		config.url: 'http://localhost:5500/',
// 		config.headers = {
// 			Authorization: `Bearer ${token()}`,
// 			Accept: 'application/json',
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 		};
// 		return config;
// 	},
// 	(error) => {
// 		Promise.reject(error);
// 	},
// );

// Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;
// 		if (error.response.status === 403 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			const access_token = token();
// 			axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
// 			return axiosApiInstance(originalRequest);
// 		}
// 		return Promise.reject(error);
// 	},
// );
