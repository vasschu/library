import bcrypt from 'bcrypt';
import usersData from '../data/users-data.js';

import serviceErrors from '../common/error-messages/service-errors.js';

/**
 * create new user
 * @param {object} userData object must have keys username and password to destructure
 * @return {object} holds 'error' if operation fails or 'result' if borrow is succesful
 */
const createUser = async (userCreate) => {
	const { username, password } = userCreate;

	const existingUser = await usersData.getUserBy('username', username);

	if (existingUser[0]) {
		return {
			error: serviceErrors.DUPLICATE_RECORD,
			result: null,
		};
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const createdUser = await usersData.create(username, passwordHash);
	return {
		error: null,
		result: createdUser,
	};
};

/**
 * create new user
 * @param {object} userDetails object must have keys username and password to destructure
 * @return {object} holds 'error' if operation fails or 'result' if borrow is succesful
 */
const logIn = async (userDetails) => {
	const { username, password } = userDetails;

	const user = await usersData.getWithRole(username);
	console.log(user);
	console.log(password);
	console.log(user.password);
	console.log(await bcrypt.compare(password, user.password));

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return { message: serviceErrors.INVALID_LOGIN };
	}

	return user;
};

export default {
	createUser,
	logIn,
};
