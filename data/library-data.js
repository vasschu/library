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

const borrowBookById = async (table, column, value) => {
	const isBookBorrowed = await getBy('books', 'idbooks', value);
	const bookStatus = isBookBorrowed[0].is_borrowed;
	if (bookStatus) {
		const sql = 'query';

		return await pool.query(sql, [value]);
	} else {
		return 'This book is already borrowed. I will tell you when it will be available once i build up this functionality, which can be pretty much never, never, ever';
	}
};

// const borrowBookById = async (table, column, value) => {
// 	const isBookBorrowed = async (tab, col, val) => {
// 		const sql = `SELECT ${col} FROM ${tab}
//         where ${col} = ${val}`;
// 		const bookStatus = await pool.query(sql, [val]);
// 		return bookStatus;
// 	};
// 	const bookAvailable = await isBookBorrowed(table, column, value);
// 	if (bookAvailable[0]) {
// 		const sql = `INSERT INTO ${table} (users_borrowed_books, books_borrowed_by_users)
//         VALUES (1, 2);`;

// 		return await pool.query(sql, [value]);
// 	}
// };

export default {
	getAll,
	getBy,
	borrowBookById,
};
