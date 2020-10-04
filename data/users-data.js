import pool from './pool.js';

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

const getUserBy = async (column, username) => {
	const sql = `SELECT * FROM users
	WHERE ${column} = ?`;

	const result = await pool.query(sql, [username]);
	return result;
};

const getWithRole = async (username) => {
	const sql = `select u.id, u.username, u.password, ul.level from users as u
	JOIN user_levels as ul ON ul.id = u.user_level
	WHERE u.username = ?;`;

	const result = await pool.query(sql, [username]);
	return result;
};

export default {
	create,
	getUserBy,
	getWithRole,
};
