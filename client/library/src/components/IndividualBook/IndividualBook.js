/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../Reviews/Review/AddReview';
import BorrowButton from '../Books/Book/BorrowButton';
import Reviews from '../Reviews/Reviews';
import EditBook from './EditBook/EditBook';
import { tokenData } from '../../common/common.js'
import { BooksContext } from '../Context/BooksContext'


const IndividualBook = (props) => {

	const { book, rate, removeBook, updateBook, retrieveIndividualBook, 
		borrowBook, returnBook, getBookRating } = useContext(BooksContext);
	
		const { id } = props.match.params;
		const { image, title, author, borrowed, description, borrow_user } = book;

	useEffect(() => {
		retrieveIndividualBook(id)
	}, [id]);

	useEffect(() => {
		getBookRating(id);
	}, [id]);

	const editBook = (id, data) => {
		updateBook(id, data);
	  };

	const { sub: logedUser, role } = tokenData;
	const { rating } = rate;
	const fixedRating = !rating ? rating : rating.toFixed();

	

	// check if admin
	const adminDelete = role === 'admin' && 
	(<NavLink to='/books'>
  		<button onClick={() => removeBook(id)}>Delete Book</button>
		</NavLink>);

	return (
		//book info
		//reviews
  <div className='book'>
    <img src={image} alt='book-cover' />
    <div className='book-info'>
      <EditBook title={title} description={description} author={author} image={image} fixedRating={fixedRating} editBook={(data) => editBook(id, data)} />
      {adminDelete}
      <br />
      <BorrowButton
        borrowed={borrowed} 
        borrowBook={() => borrowBook(id)} borrowUser={borrow_user} 
        logedUser={logedUser} returnBook={() => returnBook(id)}
      />
      <NavLink to={'/books/' + id + '/reviews'}>
        <button>Add a review</button>
      </NavLink>
      <AddReview bookId={id} />
    </div>
    <Reviews id={id} />
  </div>
	);
};

export default IndividualBook;
