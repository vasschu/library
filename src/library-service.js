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
	return await libraryData.borrowBookById(bookId, userId);
};

export default {
	getAllRecords,
	filterBooksByName,
	getBookById,
	borrowBook,
};
