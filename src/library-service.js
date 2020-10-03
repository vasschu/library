import libraryData from '../data/library-data.js';
import * as books from './../common/books-table-common.js';

const getAllRecords = async () => {
	const foundBooks = await libraryData.getAll();
	return { error: null, result: foundBooks };
};

const filterBooksByName = async (searchTerm) => {
	const foundBooks = await libraryData.getBy(books.title, searchTerm);

	if (foundBooks.length >= 1) {
		return { error: null, result: foundBooks };
	} else {
		return { error: 'shit', result: null };
	}
};

const getBookById = async (id) => {
	const book = await libraryData.getBy(books.id, id);

	if (book[0]) {
		return { error: null, result: book };
	} else {
		return { error: 'shit', result: null };
	}
};

const borrowBook = async (bookId, userId) => {
	const bookToBorrow = await libraryData.getBy(books.table, books.id, bookId);

	if (bookToBorrow[0].borrowed) {
		const book = await libraryData.borrowBookById(bookId, userId);
		return { error: null, result: book };
	} else {
		return { error: 'shit', result: null };
	}
};

const returnBook = async (bookId, userId) => {
	const book = await libraryData.getBy(books.table, books.id, bookId);

	return await libraryData.returnBookById(bookId, userId, book[0].borrowed);
};

export default {
	getAllRecords,
	filterBooksByName,
	getBookById,
	borrowBook,
	returnBook,
};
