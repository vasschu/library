/* eslint-disable react/prop-types */
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../Reviews/Review/AddReview';
import BorrowButton from '../Books/Book/BorrowButton';
import Reviews from '../Reviews/Reviews';
import EditBook from './EditBook/EditBook';
import { token, tokenData } from '../../common/common.js'
import booksSurvice from '../../data/booksData.js'

const IndividualBook = (props) => {

	const { id } = props.match.params;
	
	const [book, setBook] = useState('');
	const [rated, setRating] = useState('');
	const [error, setError] = useState(null);
	const [updatedBook, setUpdatedBook] = useState('')

	useEffect(() => {
		booksSurvice.getBookById(id)
			.then((book) => setBook(book.data))
			.catch((err) => setError(err));
	}, [id]);

	const { image, title, author, borrowed, description, borrow_user } = book;

	useEffect(() => {
		booksSurvice.getBookRating(id)
			.then((rate) => setRating(rate.data))
			.catch((err) => setError(err));
	}, [id]);

	
	const deleteBook = (id) => {
		  booksSurvice.deleteBook(id)
		.then(resp => console.log(resp.data))
		.catch(err => setError(err))
	}

	const borrowBook = (id) => {
		booksSurvice.borrowBook(id)
		.then(book => setBook(book.data))
		.catch(err => setError(err))
	}

	const returnBook = (id) => {
		booksSurvice.returnBook(id)
		.then(book => setBook(book.data.res))
		.catch(err => setError(err))

	}

	const editBook = (data) => {
		if (data) { 
		  setUpdatedBook(data)
		}
	  };
  
	  useEffect(() => {
		if (updatedBook) {
		  booksSurvice.editBook(id, updatedBook)
		.then(data => setBook(data))
		.catch(err => setError(err))
	  }
	}, [updatedBook])

	const { sub: logedUser, role } = tokenData;

	const { rating } = rated;
	const fixedRating = !rating ? rating : rating.toFixed();

	

	// check if admin
	const adminDelete = role === 'admin' && 
	(<NavLink to='/books'>
  		<button onClick={() => deleteBook(id)}>Delete Book</button>
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
