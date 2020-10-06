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
	const sql = `select u.id, u.username, u.password, ul.level from users as u
	JOIN user_levels as ul ON ul.id = u.user_level
	WHERE u.username = ?;`;

	const result = await pool.query(sql, [username]);
	return result[0];
};

export default {
	create,
	getUserBy,
	getWithRole,
};
