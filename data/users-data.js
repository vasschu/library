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

export default {
	create,
};
