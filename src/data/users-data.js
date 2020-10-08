import pool from './pool.js';

/**
 * create user
 * @param {string} username
 * @param {string} password
 * @return {object} contains id and username of the newly created user.
 */
const create = async (username, password) => {
	const sql = `
        INSERT INTO users(username, password)
        VALUES (?,?)`;

	const result = await pool.query(sql, [username, password]);

	return {
		id: result.insertId,
		username: username,
	};
};

/**
 * search the users table
 * @param {string} column from table users to search in
 * @param {string} value to search for in the column.
 * @return {object} return all entries from db matching the search.
 */
const getUserBy = async (column, value) => {
	const sql = `SELECT * FROM users
	WHERE ${column} = ?`;

	const result = await pool.query(sql, [value]);
	return result;
};

/**
 * get the role of any given user
 * @param {string} username
 * @return {object} contians id, username, hash password and role
 */
const getWithRole = async (username) => {
	const sql = `select u.id, u.username, u.is_deleted, u.is_banned, u.password, ul.level from users as u
	JOIN user_levels as ul ON ul.id = u.user_level
	WHERE u.username = ?;`;

	const result = await pool.query(sql, [username]);
	return result[0];
};

/**
 * Delete user
 * @param {number} id
 * @returns {object} details about the deleted user
 */
const deleteUser = async (id) => {
	const sql = `update users
	set is_deleted = 1
	where id = ?;`;

	const result = await pool.query(sql, [id]);
	return result;
};

/**
 * Ban user
 * @param {number} id
 * @param {string} reason for banning
 * @returns {object} details about the banned user
 */
const banUser = async (id, reason) => {
	const sql = `insert into banned_users (users_id, reason)
	VALUES (?,?)`;

	const result = await pool.query(sql, [id, reason]);
	return result;
};

/**
 * check if user is banned
 * @param {number} userId
 * @return {boolean} true if banned, false if active
 */
const isBanned = async (userId) => {
	const sql = `select ban_expired from banned_users
	WHERE users_id = ? and ban_expired = 0;`;

	const result = await pool.query(sql, [userId]);
	if (!result[0] || result.ban_expired === 0) {
		return true;
	}
	return false;
};

export default {
	create,
	getUserBy,
	getWithRole,
	deleteUser,
	banUser,
	isBanned,
};
