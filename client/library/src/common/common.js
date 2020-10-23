//get token from local storage
export const token = localStorage.getItem('token');
/**
 * Extract Token from Local Storage
 * @return {object} containing the token data - sub(id), role, username
 */
const extractToken = () => {
	localStorage.getItem('token');
	const parseJwt = (token) => {
		if (!token) {
			return;
		}
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	};

	return parseJwt(token);
};

export const tokenData = extractToken();
