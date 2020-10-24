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

	const { id } = props.match.params;
	const { book, rate, removeBook, updateBook, retrieveIndividualBook, 
		borrowBook, returnBook, getBookRating } = useContext(BooksContext);

	const [error, setError] = useState(null);
	const [updatedBook, setUpdatedBook] = useState('')

	useEffect(() => {
		retrieveIndividualBook(id)
	}, [id, retrieveIndividualBook]);
	// console.log(bookCon)
	const { image, title, author, borrowed, description, borrow_user } = book;

	useEffect(() => {
		getBookRating(id);
	}, [id, getBookRating]);

	const editBook = (data) => {
		if (data) { 
		  setUpdatedBook(data)
		}
	  };
  
	  useEffect(() => {
		if (updatedBook) {
			updateBook(id, updatedBook);
	  }
	}, [id, updatedBook, updateBook])

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
      <EditBook title={title} description={description} author={author} image={image} fixedRating={fixedRating} editBook={editBook} />
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
