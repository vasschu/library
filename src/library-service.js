import libraryData from '../data/library-data.js';

const getAllBooks = async (database) => {
	return await libraryData.getAll(database);
};

export default {
	getAllBooks,
};
