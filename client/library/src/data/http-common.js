import axios from 'axios';
import { token } from './../common/common';

export default axios.create({
	baseURL: 'http://localhost:5500/',
	headers: {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json, text/plain, */*',
	},
});
