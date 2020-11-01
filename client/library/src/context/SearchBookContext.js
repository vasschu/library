import React, { createContext, useState } from 'react';
import BooksService from '../data/booksData.js';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { handleError } from '../common/handleErrors.js'

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
                handleError(err)
				setSearched([])
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
