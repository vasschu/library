import libraryData from '../data/library-data.js';

const getAllRecords = async (table) => {
	return await libraryData.getAll(table);
};

const filterBooksByName = async (table, searchTerm) => {
	return await libraryData.getBy(table, 'name', searchTerm);
};

export default {
	getAllRecords,
	filterBooksByName,
};
