import bcrypt from 'bcrypt';
import usersData from '../data/users-data.js';

import serviceErrors from '../common/error-messages/service-errors.js';

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

const logIn = async (userDetails) => {
	const { username, password } = userDetails;

	const user = await usersData.getWithRole(username);

	if (!user || (await bcrypt.compare(password, user.password))) {
		return { message: serviceErrors.INVALID_LOGIN };
	}

	return user;
};

export default {
	createUser,
	logIn,
};
