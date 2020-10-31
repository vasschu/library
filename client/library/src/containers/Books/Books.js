import React, { useEffect, useContext } from 'react';
import Book from '../../components/Book/Book';
import AddBook from '../../components/AddBook/AddBook';
import { tokenData } from '../../common/common.js';
import './Books.css';
import { BooksContext } from '../../context/BooksContext';
import { useLocation } from 'react-router-dom';

const Books = () => {
	const { books, book, searched, getAllBooks } = useContext(BooksContext);
	const tokenPayload = tokenData();
	const { search } = useLocation()
	
	useEffect(() => {
		getAllBooks();
	}, [book]);

	const isAdmin = tokenPayload.role === 'admin' && (
  <AddBook />
	);

	const searchedBooks = searched && searched.map((book) => {
		return <Book key={book.id} book={book} tokenData={tokenPayload} />;
	})
	const allBooks = (books.map((book) => {
		return <Book key={book.id} book={book} tokenData={tokenPayload} />;
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
