import decode from 'jwt-decode';

/**
 * Extract Token from Local Storage
 * @return {object} containing the token data - sub(id), role, username
 */
export const tokenData = () => {
	const token = localStorage.getItem('token');
	if (token) {
		const tokenPayload = decode(token);
		console.log(tokenPayload);
		return tokenPayload;
	}
};
