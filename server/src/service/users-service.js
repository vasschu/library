import bcrypt from 'bcrypt';
import usersData from '../data/users-data.js';

import serviceErrors from '../common/error-messages/service-errors.js';
import { changeLevel } from '../common/points-calculator.js';

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

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return { error: serviceErrors.INVALID_LOGIN, result: null };
	}

	return { error: null, result: user };
};

/**
 * Delete user
 * @param {number} id the user to be deleted's id
 * @param {string} role the role of the user initiating the deletion
 * @returns {object} error and result key:value pairs
 */
const deleteUser = async (id, role) => {
	if (role === 'admin') {
		const removedUser = await usersData.deleteUser(id);
		if (removedUser.affectedRows === 0) {
			return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
		}

		return { error: null, result: { id } };
	}
};

/**
 * Ban user
 * @param {number} id the user to be banned's id
 * @param {string} reason the reason for banning the user
 * @param {string} role the role of the user initiating the banning
 * @returns {object} error and result key:value pairs
 */
const banUser = async (id, reason, role) => {
	if (role === 'admin') {
		const bannedUser = await usersData.banUser(id, reason);
		const bannedUserInfo = await usersData.getUserBy('id', id);

		if (bannedUser.affectedRows === 0) {
			return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
		}
		const userData = await usersData.getWithRoleById(id);
		console.log(userData)
		const chanagedLevel = await changeLevel(id, userData.level);

		return {
			error: null,
			result: {
				id: bannedUserInfo[0].id,
				username: bannedUserInfo[0].username,
			},
			level: chanagedLevel,
		};
	}
};

/**
 * Delete user
 * @param {number} id the user to be deleted's id
 * @param {string} role the role of the user initiating the deletion
 * @returns {object} error and result key:value pairs
 */
const getUsersList = async (column, value) => {
	const allUsers = await usersData.getUserBy(column, value);
	const bannedUsers = await usersData.allBanned();
	const userInfo = allUsers.map((el) => {
		return {
			id: el.id,
			username: el.username,
			// is_deleted: el.is_deleted === 1,
			is_banned: bannedUsers.includes(el.id),
			user_level: el.user_level,
		};
	});
	return { error: null, result: userInfo };
};

export default {
	createUser,
	logIn,
	deleteUser,
	banUser,
	getUsersList,
};
