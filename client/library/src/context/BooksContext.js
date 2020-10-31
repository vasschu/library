import React, { createContext, useState } from 'react';
import BooksService from '../data/booksData.js';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenData } from '../common/common.js';
import { toastError, toastSuccess, toastRole } from '../common/toaster.js'

toast.configure();
const initialState = [];

export const BooksContext = createContext(initialState);

export const BooksProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const [book, setBook] = useState({});
	const [rate, setRate] = useState('');
	const [searched, setSearched] = useState('');
	const tokenPayload = tokenData();

	const getAllBooks = () => {
		BooksService.getBooks()
			.then((resBooks) => {
				setBooks(resBooks.data);
			})
			.catch((err) => {
				if (err.response) {
					// client received an error response (5xx, 4xx)
					toastError(err.response.data);
				} else if (err.request) {
					// client never received a response, or request never left
					toastError('Ooops, something went wrong!');
				} else {
					// anything else
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const addBook = (book) => {
		BooksService.create(book)
			.then((res) => {
				if (typeof res.data === 'object') {
					setBooks((books) => [...books, res.data]);
					toastSuccess('The book was uploaded successfully!');
				}
			})
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const removeBook = (id) => {
		BooksService.deleteBook(id)
			.then((resBook) => {
				setBook(resBook.data);
				toastSuccess('The book was deleted successfully!');
			})
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const updateBook = (id, info) => {
		BooksService.editBook(id, info)
			.then((resBook) => {
				setBook(resBook.data);
				toastSuccess('The book was updated successfully!');
			})
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const retrieveIndividualBook = (id) => {
		BooksService.getBookById(id)
			.then((resBook) => setBook(resBook.data))
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const borrowBook = (id) => {
		BooksService.borrowBook(id)
			.then((resBook) => setBook(resBook.data))
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const returnBook = (id) => {
		BooksService.returnBook(id)
			.then((resBook) => {
				setBook(resBook.data.res);
				if (resBook.data.level && resBook.data.level !== tokenPayload.role) {
					toastRole(resBook.data.level);
				}
			})
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const getBookRating = (id) => {
		BooksService.getBookRating(id)
			.then((bookRate) => setRate(bookRate.data))
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const rateBook = (id, rating) => {
		BooksService.rateBook(id, rating)
			.then((res) => {
				setBook(res.data.message);
				toastSuccess('The book was rated successfully!');

				if (res.data.level && res.data.level !== tokenPayload.role) {
					toastRole(res.data.level);
				}
			})
			.catch((err) => {
				if (err.response) {
					toastError(err.response.data.message);
				} else if (err.request) {
					toastError('Ooops, something went wrong!');
				} else {
					toastError('Ooops, something went wrong!');
				}
			});
	};

	const searchBook = (searchTerm) => {
		BooksService.searchBook(searchTerm)
		.then((res) => {
			console.log(res.data)
			// setBooks(res.data)
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
  <BooksContext.Provider
    value={{
				books,
				book,
				rate,
				searched,
				getAllBooks,
				addBook,
				removeBook,
				updateBook,
				retrieveIndividualBook,
				borrowBook,
				returnBook,
				getBookRating,
				rateBook,
				searchBook,
    }}
  >
    {children}
  </BooksContext.Provider>
	);
};

BooksProvider.propTypes = {
	children: PropTypes.array,
};
