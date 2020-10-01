import pool from './pool.js';
import * as booksCommon from './../common/books-table-common.js';
import * as borrowedBooksCommon from './../common/borrowed-books-table-common.js';

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

const borrowBookById = async (bookId, userId) => {
	const isBookBorrowed = await getBy(
		booksCommon.tableBooks,
		booksCommon.columnid,
		bookId,
	);
	const bookStatus = isBookBorrowed[0].is_borrowed;
	if (!bookStatus) {
		const sql = `UPDATE  ${booksCommon.tableBooks} 
        SET ${booksCommon.columnIsBorrowed} = 1
        WHERE ${booksCommon.columnid} = ${bookId};`;
		const sql2 = `INSERT INTO ${borrowedBooksCommon.tableBorrowedBooks} (${borrowedBooksCommon.columnBookId}, ${borrowedBooksCommon.columnUserId})
        VALUES (?, ?);`;
		await pool.query(sql, [bookId]);
		await pool.query(sql2, [bookId, userId]);
		return getBy(booksCommon.tableBooks, booksCommon.columnid, bookId);
	} else {
		return 'This book is already borrowed. I will tell you when it will be available once i build up this functionality, which can be pretty much never, never, ever';
	}
};

export default {
	getAll,
	getBy,
	borrowBookById,
};
