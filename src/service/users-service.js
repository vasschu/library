import bcrypt from 'bcrypt';
import usersData from './../../data/users-data.js';

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

export default {
	createUser,
};
