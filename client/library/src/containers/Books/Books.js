import React, { useEffect, useContext, useState } from 'react';
import Book from '../../components/Book/Book';
import AddBook from '../../components/AddBook/AddBook';
import { tokenData } from '../../common/common.js';
import './Books.css';
import { SearchBooksContext } from '../../context/SearchBookContext';
import { useLocation } from 'react-router-dom';
import { toastError, toastRole, toastSuccess } from '../../common/toaster.js'
import BooksService from '../../data/booksData.js'

const Books = () => {
	const { searched } = useContext(SearchBooksContext);
	const tokenPayload = tokenData();
	const { search } = useLocation()

	const [books, setBooks] = useState([]);

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

	const borrowBook = (id) => {
		BooksService.borrowBook(id)
			.then((resBook) => {
        		const copy = [...books];
				const index = books.findIndex((book) => book.id === resBook.data.id);
        		copy[index] = resBook.data;

				setBooks(copy);
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

	const returnBook = (id) => {
		BooksService.returnBook(id)
			.then((resBook) => {
        		const copy = [...books];
				const index = books.findIndex((book) => book.id === resBook.data.res.id);
        		copy[index] = resBook.data.res;

				setBooks(copy);
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

	
	useEffect(() => {
		getAllBooks();
	}, []);

	const isAdmin = tokenPayload.role === 'admin' && (
  <AddBook addBook={addBook} />
	);

	const searchedBooks = searched && searched.map((book) => {
		return <Book key={book.id} book={book} borrowBook={borrowBook} returnBook={returnBook} tokenData={tokenPayload} />;
	})
	const allBooks = (books.map((book) => {
		return <Book key={book.id} book={book} borrowBook={borrowBook} returnBook={returnBook} tokenData={tokenPayload} />;
	}))

	return (
  <>
    {isAdmin}
    <div className='books'>
      {search ? searchedBooks : allBooks}
    </div>
  </>
);
	}

export default Books;
