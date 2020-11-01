import { useState } from 'react';
import BooksService from '../data/booksData.js';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '../common/toaster.js'


export const useSearch = () => {
	const [searched, setSearched] = useState('');

	const searchBook = (searchTerm) => {
		BooksService.searchBook(searchTerm)
		.then((res) => {
			setSearched(res.data)
		})
		.catch((err) => {
			if (err.response) {
				toastError(err.response.data.message);
				setSearched([])
			} else if (err.request) {
				toastError('Ooops, something went wrong!');
			} else {
				toastError('Ooops, something went wrong!');
			}
		});
	}

	return {
				searched,
				searchBook,
    }
};


