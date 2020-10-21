import pool from './pool.js';
import * as books from '../common/books-table-common.js';
import * as borrow from '../common/borrowed-books-table-common.js';

/**
 * get all books from books table
 * @return {array} holding all books indexed by id
 */
const getAll = async () => {
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed, b.is_unlisted, b.image FROM books b
	left join borrowed_books bb
	on b.id = bb.books_id and bb.is_deleted = 0
	where b.is_unlisted = 0
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
	const sql = `SELECT b.id, b.title, b.author, bb.is_deleted as borrowed, b.image, b.description FROM books b  
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

/**
 * Create a book
 * @param {string} title
 * @param {string} author
 * @param {string} description
 * @returns {object} details for the created book
 */
const createBook = async (title, author, description) => {
	const sql = `INSERT INTO library.books (title, author, description, image)
	VALUES (?, ?, ?, ?);`;

	return await pool.query(sql, [title, author, description, 0]);
};

/**
 * Get book by id
 * @param {number} id the book's id
 * @returns {object} book's info
 */
const getById = async (id) => {
	// const sql = `SELECT id, title, author, description, image FROM books
	// WHERE id = ?`;

	const sql = `SELECT * FROM books
	WHERE id = ?`;

	const book = await pool.query(sql, id);
	return book[0];
};

/**
 * Update a book
 * @param {number} id the book's id
 * @param {string} title
 * @param {string} author
 * @param {string} description
 * @param {string} image
 * @returns {object} details for the updated book
 */
const updateBook = async (id, title, author, description, image) => {
	const sql = `UPDATE books
    SET title = ?, author = ?, description = ?, image = ?
	WHERE id = ?;`;

	const updated = pool.query(sql, [title, author, description, image, id]);

	return updated;
};

/**
 * Delete a book
 * @param {number} id the book's id
 * @returns {object} deatils for the deleted book
 */
const deleteBook = async (id) => {
	const sql = `UPDATE books
	SET is_unlisted = 1
	WHERE id = ?`;

	return await pool.query(sql, [id]);
};

/**
 * Gets borrowed book info
 * @param {number} bookId
 * @param {string} userId
 * @returns {object} the borrow details || undefined
 */
const getBorowed = async (bookId, userId) => {
	const sql = `SELECT * FROM library.borrowed_books
	WHERE return_date IS NOT NULL 
	AND books_id = ?
	AND users_id = ?`;

	const borrowed = await pool.query(sql, [bookId, userId]);
	return borrowed[0];
};

/**
 * Get info book rating info
 * @param {number} bookId
 * @param {number} userId
 * @returns {object} book rating info
 */
const getBookRating = async (bookId, userId) => {
	const sql = `SELECT * FROM book_ratings
	WHERE users_id = ?
	AND books_id = ?;`;

	const rated = await pool.query(sql, [userId, bookId]);
	return rated[0];
};

/**
 * Create rating
 * @param {number} bookId
 * @param {number} userId
 * @param {number} rating
 * @returns {object} rating details
 */
const createRate = async (bookId, userId, rating) => {
	const sql = `INSERT INTO book_ratings (rating, users_id, books_id)
	VALUES (?, ?, ?);`;

	return await pool.query(sql, [+rating, +userId, +bookId]);
};

/**
 * Update rating
 * @param {number} bookId
 * @param {number} userId
 * @param {number} rating
 * @returns {object} rating details
 */
const updateRate = async (bookId, userId, rating) => {
	const sql = `UPDATE book_ratings 
	SET rating = ?
	WHERE users_id = ?
	AND books_id = ?`;

	return await pool.query(sql, [+rating, +userId, +bookId]);
};

const changeLevel = async (userId, role) => {
	let level;
	if (role === 'regular') {
		level = 1;
	} else if (role === 'powerReader') {
		level = 3;
	} else if (role === 'masterReader') {
		level = 4;
	} else if (role === 'moderator') {
		level = 5;
	}

	const sql = `UPDATE users
	SET user_level = ?
	WHERE id = ?`;

	const res = await pool.query(sql, [level, userId]);

	if (res.affectedRows) {
		return role;
	}

	return null;
};

const getAverageBookRate = async (bookId) => {
	const sql = `SELECT AVG(rating) AS average
	FROM book_ratings
	WHERE books_id = ?;`

	const res = await pool.query(sql, [bookId]);
	console.log(res)
	return res[0].average;
}

export default {
	getAll,
	getBy,
	borrowBookById,
	returnBookById,
	getBorrowedBookByUser,
	createBook,
	getById,
	updateBook,
	deleteBook,
	getBorowed,
	getBookRating,
	createRate,
	updateRate,
	changeLevel,
	getAverageBookRate
};
