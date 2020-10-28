import React, { useEffect, useContext } from 'react';
import Book from '../../components/Book/Book';
import AddBook from '../../components/AddBook/AddBook';
import { tokenData } from '../../common/common.js';
import './Books.css';
import { BooksContext } from '../../context/BooksContext';
import { AuthContext } from '../../context/AuthContext';

const Books = () => {
	const { books, book, getAllBooks, addBook } = useContext(BooksContext);
	const tokenPayload = tokenData();

	useEffect(() => {
		getAllBooks();
	}, [book]);

	const isAdmin = tokenPayload.role === 'admin' && (
		<AddBook book={(data) => addBook(data)} />
	);

	return (
		<>
			{isAdmin}
			<div className='books'>
				{books.map((book) => {
					return <Book key={book.id} book={book} tokenData={tokenPayload} />;
				})}
			</div>
		</>
	);
};

export default Books;
