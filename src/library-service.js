import libraryData from '../data/library-data.js';
import * as booksCommon from './../common/books-table-common.js';

const getAllRecords = async (table) => {
	return await libraryData.getAll(table);
};

const filterBooksByName = async (table, searchTerm) => {
	return await libraryData.getBy(table, booksCommon.columnName, searchTerm);
};

const getBookById = async (table, id) => {
	return await libraryData.getBy(table, booksCommon.columnid, id);
};

const borrowBook = async (bookId, userId) => {
	const book = await libraryData.getBy(
		booksCommon.tableBooks,
		booksCommon.columnid,
		bookId,
	);
	const bookStatus = book[0].borrowed;

	return await libraryData.borrowBookById(bookId, userId, bookStatus);
};

const returnBook = async (bookId, userId) => {
	const book = await libraryData.getBy(
		booksCommon.tableBooks,
		booksCommon.columnid,
		bookId,
	);
	const bookStatus = book[0].borrowed;

	return await libraryData.returnBookById(bookId, userId, bookStatus);
};

export default {
	getAllRecords,
	filterBooksByName,
	getBookById,
	borrowBook,
	returnBook,
};
