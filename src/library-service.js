import libraryData from '../data/library-data.js';

// common string parameters - we can add common.js file to collect those. Will make the code pretty clean
const bookName = 'name';
const bookId = 'idbooks';

const getAllRecords = async (table) => {
	return await libraryData.getAll(table);
};

const filterBooksByName = async (table, searchTerm) => {
	return await libraryData.getBy(table, bookName, searchTerm);
};

const getBookById = async (table, id) => {
	return await libraryData.getBy(table, bookId, id);
};

export default {
	getAllRecords,
	filterBooksByName,
	getBookById,
};
