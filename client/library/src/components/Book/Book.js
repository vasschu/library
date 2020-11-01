/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import BorrowButton from './BorrowButton';
import './Book.css';

const Book = ({ book, borrowBook, returnBook, tokenData }) => {
	const { id, image, title, author, borrowed, borrow_user } = book;

	return (
		<div className='book'>
			<Link to={'/books/' + id}>
				<img src={image} alt='book-cover' />
			</Link>
			<div className='book-info'>
				<h2>{title}</h2>
				<p className='author'>{author}</p>
				<NavLink to={'/books/' + id}>
					<button className='book-details-btn'>View Details</button>
				</NavLink>
				<br />
				<BorrowButton
					borrowed={borrowed}
					logedUser={tokenData.sub}
					borrowUser={borrow_user}
					borrowBook={() => borrowBook(id)}
					returnBook={() => returnBook(id)}
				/>
			</div>
		</div>
	);
};

export default Book;
