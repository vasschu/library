import pool from './pool.js';

const getAll = async (table) => {
	const sql = `
        SELECT * 
        FROM ${table}
    `;

	return await pool.query(sql);
};

const getBy = async (table, column, value) => {
	const sql = `
        SELECT *  
        FROM ${table}
        WHERE ${column} like "%${value}%"
    `;

	return await pool.query(sql, [value]);
};

export default {
	getAll,
	getBy,
};
