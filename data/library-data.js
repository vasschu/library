import pool from './pool.js';
import * as books from './../common/books-table-common.js';
import * as borrow from './../common/borrowed-books-table-common.js';

const getAll = async () => {
	const sql = `SELECT b.id, b.title, b.author, bb.isDeleted as borrowed, b.is_unlisted FROM books b
	left join borrowed_books bb
	on b.id = bb.books_id and bb.isDeleted = 0
	order by b.id asc;`;
	const allBooks = await books.formatBookData(await pool.query(sql));

	return allBooks;
};

const getBy = async (column, value) => {
	const sql = `SELECT b.id, b.title, b.author, bb.isDeleted as borrowed FROM books b  
	left join borrowed_books bb
	on b.id = bb.books_id and bb.isDeleted = 0
	WHERE b.${column} like "%${value}%";`;

	const foundBooks = books.formatBookData(await pool.query(sql, [value]));

	return foundBooks;
};

const borrowBookById = async (bookId, userId) => {
	const sql = `INSERT INTO ${borrow.table} (${borrow.bookId}, ${borrow.userId}, ${borrow.isDeleted})
				VALUES (?, ?, ?);
				`;
	await pool.query(sql, [bookId, userId, 0]);

	return getBy(books.table, books.id, bookId);
};

//return borrowed book
const returnBookById = async (bookId, userId, bookStatus) => {
	const sql = `SELECT * FROM borrowed_books
		where users_id = ? and books_id= ? and isDeleted = ?`;
	await pool.query(sql, [userId, bookId, 0]);

	if (bookStatus && borrowStatus[0]) {
		const sql = `UPDATE ${borrow.table}
	 SET ${borrow.isDeleted} = !${borrow.isDeleted},
	 ${borrow.returnDate} = now()
 WHERE ${borrow.bookId} = ${bookId} and ${borrow.isDeleted} = 0`;
		await pool.query(sql);

		return getBy(books.table, books.id, bookId);
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
