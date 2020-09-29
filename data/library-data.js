import pool from './pool.js';

const getAll = async (database) => {
	const sql = `
        SELECT idbooks, name 
        FROM ${database}
    `;

	return await pool.query(sql);
};

const getBy = async (database, column, value) => {
	const sql = `
        SELECT idbooks, name  
        FROM ${database}
        WHERE ${column} = ?
    `;

	const result = await pool.query(sql, [value]);

	return result[0];
};

export default {
	getAll,
	getBy,
};
