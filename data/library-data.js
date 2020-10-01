import pool from './pool.js';
import * as booksCommon from './../common/books-table-common.js';
import * as borrowedCommon from './../common/borrowed-books-table-common.js';

const getAll = async () => {
	const sql = `SELECT b.id, b.title, b.author, bb.books_id FROM books b
	left join borrowed_books bb
	on b.id = bb.books_id`;
	let allBooks = await pool.query(sql);

	allBooks = await allBooks.map((el) => {
		if (el.books_id) {
			el.books_id = true;
			return el;
		} else {
			el.books_id = false;
			return el;
		}
	});
	return allBooks;
};

const getBy = async (table, column, value) => {
	const sql = `SELECT b.${booksCommon.columnid}, b.${booksCommon.columnName}, b.${booksCommon.columnAuthor}, bb.${borrowedCommon.columnBookId} as borrowed FROM ${table} b  
	left join ${borrowedCommon.tableBorrowedBooks} bb
	on b.id = bb.books_id and bb.isDeleted = 0
	WHERE b.${column} like "%${value}%"`;
	let foundBooks = await pool.query(sql, [value]);

	foundBooks = await foundBooks.map((el) => {
		if (el.borrowed) {
			el.borrowed = true;
			return el;
		} else {
			el.borrowed = false;
			return el;
		}
	});

	return foundBooks;
};

const borrowBookById = async (bookId, userId, bookStatus) => {
	if (!bookStatus) {
		const sql = `INSERT INTO ${borrowedCommon.tableBorrowedBooks} (${borrowedCommon.columnBookId}, ${borrowedCommon.columnUserId}, ${borrowedCommon.columnIsDeleted})
				VALUES (?, ?, ?);
				`;
		await pool.query(sql, [bookId, userId, 0]);
		return getBy(booksCommon.tableBooks, booksCommon.columnid, bookId);
	} else {
		return 'This book is already borrowed. I will tell you when it will be available once i build up this functionality, which can be pretty much never, never, ever';
	}
};

//return borrowed book
const returnBookById = async (bookId, userId, bookStatus) => {
	const sql = `SELECT * FROM borrowed_books
		where users_id = ${userId} and books_id=${bookId} and isDeleted = 0`;
	const borrowStatus = await pool.query(sql, [bookId, userId, 0]);

	if (bookStatus && borrowStatus[0]) {
		const sql = `UPDATE ${borrowedCommon.tableBorrowedBooks}
	 SET ${borrowedCommon.columnIsDeleted} = !${borrowedCommon.columnIsDeleted},
	 ${borrowedCommon.columnReturnDate} = 'now()'
 WHERE ${borrowedCommon.columnBookId} = ${bookId}`;
		await pool.query(sql, [1]);
		return getBy(booksCommon.tableBooks, booksCommon.columnid, bookId);
	} else {
		return 'No such book is currently borrowed by this user, please check input data.';
	}
};

export default {
	getAll,
	getBy,
	borrowBookById,
	returnBookById,
};
