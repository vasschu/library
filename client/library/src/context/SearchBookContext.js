import React, { createContext, useState } from 'react';
import BooksService from '../data/booksData.js';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '../common/toaster.js'

const initialState = [];

export const SearchBooksContext = createContext(initialState);

export const SearchBooksProvider = ({ children }) => {
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

	return (
  <SearchBooksContext.Provider
    value={{
				searched,
				searchBook,
    }}
  >
    {children}
  </SearchBooksContext.Provider>
	);
};

SearchBooksProvider.propTypes = {
	children: PropTypes.array,
};
