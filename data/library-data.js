import pool from './pool.js';
import * as books from './../common/books-table-common.js';
import * as borrow from './../common/borrowed-books-table-common.js';

const getAll = async () => {
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed, b.is_unlisted FROM books b
	left join borrowed_books bb
	on b.id = bb.books_id and bb.is_deleted = 0
	order by b.id asc;`;
	const allBooks = await books.formatBookData(await pool.query(sql));

	return allBooks;
};

const getBy = async (column, value) => {
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed FROM books b  
	left join borrowed_books bb
	on b.id = bb.books_id and bb.is_deleted = 0
	WHERE b.${column} like "%${value}%";`;

	const foundBooks = books.formatBookData(await pool.query(sql, [value]));

	return await foundBooks;
};

const borrowBookById = async (bookId, userId) => {
	const sql = `INSERT INTO ${borrow.table} (${borrow.bookId}, ${borrow.userId}, ${borrow.isDeleted})
				VALUES (?, ?, ?);
				`;
	await pool.query(sql, [bookId, userId, 0]);

	return await getBy(books.id, bookId);
};

//return borrowed book
const returnBookById = async (bookId) => {
	const sql = `UPDATE ${borrow.table}
SET ${borrow.isDeleted} = !${borrow.isDeleted},
${borrow.returnDate} = now()
WHERE ${borrow.bookId} = ${bookId} and ${borrow.isDeleted} = 0`;

	await pool.query(sql);

	return getBy(books.id, bookId);
};

const getBorrowedBookByUser = async (userId, bookId, isDeleted) => {
	const sql = `select * from borrowed_books
	where (${userId} is null or users_id = ${userId})
	and (${bookId} is null or books_id = ${bookId})
	and (${isDeleted} is null or is_deleted = ${isDeleted})`;
	const foundBooks = await books.formatBookData(await pool.query(sql));
	return foundBooks;
};

export default {
	getAll,
	getBy,
	borrowBookById,
	returnBookById,
	getBorrowedBookByUser,
};
