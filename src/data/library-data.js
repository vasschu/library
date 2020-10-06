import pool from './pool.js';
import * as books from '../common/books-table-common.js';
import * as borrow from '../common/borrowed-books-table-common.js';

/**
 * get all books from books table
 * @return {array} holding all books indexed by id
 */
const getAll = async () => {
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed, b.is_unlisted FROM books b
	left join borrowed_books bb
	on b.id = bb.books_id and bb.is_deleted = 0
	order by b.id asc;`;
	const allBooks = await books.formatBookData(await pool.query(sql));

	return allBooks;
};

/**
 * find book in books table
 * @param {string} column the name of the column you want to search
 * @param {any} value you are searching for.
 * @return {array} holding the results of the search. Empty array of no matches.
 */
const getBy = async (column, value) => {
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed FROM books b  
	left join borrowed_books bb
	on b.id = bb.books_id and bb.is_deleted = 0
	WHERE b.${column} like "%${value}%";`;

	const foundBooks = books.formatBookData(await pool.query(sql, [value]));

	return await foundBooks;
};

/**
 * add record for borrowed book in the database
 * @param {number} bookId the id of the borrwed book
 * @param {number} userId the id of the user borrwoing the book
 * @return {array} it returns the info for the borrowed book.
 */
const borrowBookById = async (bookId, userId) => {
	const sql = `INSERT INTO ${borrow.table} (${borrow.bookId}, ${borrow.userId}, ${borrow.isDeleted})
				VALUES (?, ?, ?);
				`;
	await pool.query(sql, [bookId, userId, 0]);

	return await getBy(books.id, bookId);
};

/**
 * return book, by updating is_deleted column in the database
 * @param {number} bookId the id of the borrwed book
 * @return {array} it returns the info for the returned book.
 */
const returnBookById = async (bookId) => {
	const sql = `UPDATE ${borrow.table}
SET ${borrow.isDeleted} = !${borrow.isDeleted},
${borrow.returnDate} = now()
WHERE ${borrow.bookId} = ${bookId} and ${borrow.isDeleted} = 0`;

	await pool.query(sql);

	return getBy(books.id, bookId);
};

/**
 * Get all borrowed books by user
 * @param {number} userId(optional, use null as argument to skip this) the id of the user
 * @param {number} bookId(optional, use null as argument to skip this) the id of the book
 * @param {number} isDeleted(optional, use null as argument to skip this) use 0 for currently borrowed books or 1 for history of returned books.
 * @return {array} contains all books matching the passed arguments.
 */
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
