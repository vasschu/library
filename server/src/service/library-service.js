import libraryData from '../data/library-data.js';
import * as books from '../common/books-table-common.js';
import serviceErrors from '../common/error-messages/service-errors.js';
import reviewsData from '../data/reviews-data.js';
import { changeLevel } from '../common/points-calculator.js';

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
		return { error: null, result: book[0] };
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
		return { error: null, result: book[0] };
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
const returnBook = async (bookId, userId, role) => {
	const isBookBorrowedByThisUser = await libraryData.getBorrowedBookByUser(
		userId,
		bookId,
		0,
	);

	if (isBookBorrowedByThisUser[0]) {
		const book = await libraryData.returnBookById(bookId);

		const changedLevel = await changeLevel(userId, role);

		return { error: null, result: book[0], level: changedLevel };
	} else {
		return { error: 'make error file', result: null };
	}
};

/**
 * Create a book
 * @param {object} body the book's details
 * @return {object} holds 'error' if operation fails or 'result' if return is succesful
 */
const createBook = async (body) => {
	const { title, author, description, image } = body;

	const response = await libraryData.createBook(
		title,
		author,
		description,
		image,
	);
	return { error: null, result: response };
};

/**
 * Update a book
 * @param {number} id the book's id
 * @param {object} body the book's details to update
 * @return {object} holds 'error' if operation fails or 'result' if return is succesful
 */
const updateBook = async (id, body) => {
	const book = await libraryData.getById(id);
	const title = body.title || book.title;
	const author = body.author || book.author;
	const description = body.description || book.description;
	const image = body.image || book.image;

	const updated = await libraryData.updateBook(
		id,
		title,
		author,
		description,
		image,
	);

	if (!updated.affectedRows) {
		return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
	}

	const updatedBook = await libraryData.getById(id);
	return { error: null, result: updatedBook };
};

/**
 * Delete a book
 * @param {number} id the book's id
 * @return {object} holds 'error' if operation fails or 'result' if return is succesful
 */
const deleteBook = async (id) => {
	const deleted = await libraryData.deleteBook(id);

	if (!deleted.affectedRows) {
		return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
	}

	return { error: null, result: deleted };
};

/**
 * Rate a book
 * @param {number} bookId the book's id
 * @param {object} user the user trying to rate the book's deatils
 * @param {number} rating the rating
 * @return {object} holds 'error' if operation fails or 'result' if return is succesful
 */
const rateBook = async (bookId, user, rating) => {
	const { id, role } = user;
	const isBorrowed = await libraryData.getById(bookId, id);

	if (!isBorrowed) {
		return { error: serviceErrors.NOT_FOUND, result: null };
	}

	const isReviewed = await reviewsData.getReviewByUser(bookId, id);

	if (!isReviewed) {
		return { error: serviceErrors.NOT_PERMITTED, result: null };
	}

	const ratedBook = await libraryData.getBookRating(bookId, id);

	let rate;
	if (!ratedBook) {
		rate = await libraryData.createRate(bookId, id, rating);
	} else {
		rate = await libraryData.updateRate(bookId, id, rating);
	}

	if (!rate.affectedRows) {
		return { error: serviceErrors.NO_DATABASE_CHANGES, result: null };
	}
	const changedLevel = await changeLevel(id, role);

	const book = await libraryData.getById(bookId);

	return { error: null, result: book, level: changedLevel };
};

const getAverageBookRating = async (bookId) => {
	const rate = await libraryData.getAverageBookRate(bookId);

	return rate;
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
	rateBook,
	getAverageBookRating,
};
