import bcrypt from 'bcrypt';
import usersData from '../data/users-data.js';

import serviceErrors from '../common/error-messages/service-errors.js';

const createUser = async (userCreate) => {
	const { username, password } = userCreate;

	// const existingUser = await usersData.getBy('username', username);

	// if (existingUser) {
	// 	return {
	// 		error: serviceErrors.DUPLICATE_RECORD,
	// 		user: null,
	// 	};
	// }

	const passwordHash = await bcrypt.hash(password, 10);
	return await usersData.create(username, passwordHash);
};

const logIn = async (userDetails) => {
	const { username/*, password*/ } = userDetails;

	const user = usersData.getWithRole(username);

	if (!user /*&& !(await bcrypt.compare(user.password, password))*/){
		return {message: serviceErrors.INVALID_LOGIN};
	}

	return user;
};

export default {
	createUser,
	logIn,
};
