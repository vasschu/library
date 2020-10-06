import libraryData from '../data/library-data.js';
import * as books from '../common/books-table-common.js';
import serviceErrors from '../common/error-messages/service-errors.js';

/**
 * Get all books
 * @return {object} holds 'error' if operation fails or 'result' containing the found books
 */
const getAllRecords = async () => {
	const foundBooks = await libraryData.getAll();
	return { error: null, result: foundBooks };
};

/**
 * Search book by name
 * @param {string} search the books tible by book name
 * @return {object} holds 'error' if operation fails or 'result' containing the found books
 */

const filterBooksByName = async (searchTerm) => {
	const foundBooks = await libraryData.getBy(books.title, searchTerm);

	if (foundBooks.length >= 1) {
		return { error: null, result: foundBooks };
	} else {
		return { error: 'make error file', result: null };
	}
};

/**
 * Search book by name
 * @param {number} id to search the books table with
 * @return {object} holds 'error' if operation fails or 'result' containing the found books
 */
const getBookById = async (id) => {
	const book = await libraryData.getBy(books.id, id);

	if (book[0]) {
		return { error: null, result: book };
	} else {
		return { error: 'make error file', result: null };
	}
};

/**
 * borrow book by id
 * @param {number} bookId to search the books table with
 * @param {number} userId to search the users table with
 * @return {object} holds 'error' if operation fails or 'result' if borrow is succesful
 */
const borrowBook = async (bookId, userId) => {
	const bookToBorrow = await libraryData.getBy(books.id, bookId);

	if (!bookToBorrow[0].borrowed) {
		const book = await libraryData.borrowBookById(bookId, userId);
		return { error: null, result: book };
	} else {
		return { error: 'make error file', result: null };
	}
};

/**
 * Return book by id
 * @param {number} bookId to search the books table with
 * @param {number} userId to search the users table with
 * @return {object} holds 'error' if operation fails or 'result' if return is succesful
 */
const returnBook = async (bookId, userId) => {
	const isBookBorrowedByThisUser = await libraryData.getBorrowedBookByUser(
		userId,
		bookId,
		0,
	);

	if (isBookBorrowedByThisUser[0]) {
		const book = await libraryData.returnBookById(bookId);
		return { error: null, result: book };
	} else {
		return { error: 'make error file', result: null };
	}
};

const createBook = async (body) => {
	const { title, author, description } = body;

	return await libraryData.createBook(title, author, description); 
}; 

const updateBook = async (id, body) => {
	const updated = await libraryData.updateBook(id, body);

	if (!updated.affectedRows) {
		return serviceErrors.NO_DATABASE_CHANGES;
	}

	return updated;

	
};

const deleteBook = async (id) => {
	const deleted = await libraryData.deleteBook(id);

	if (!deleted.affectedRows) {
		return serviceErrors.NO_DATABASE_CHANGES;
	}

	return deleted;
};

export default {
	getAllRecords,
	filterBooksByName,
	getBookById,
	borrowBook,
	returnBook,
	createBook,
	updateBook,
	deleteBook,
};
