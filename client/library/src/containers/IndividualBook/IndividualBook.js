/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../../components/Reviews/Review/AddReview';
import BorrowButton from '../../components/Book/BorrowButton';
import Reviews from '../../components/Reviews/Reviews';
import EditBook from '../../components/EditBook/EditBook';
import { tokenData } from '../../common/common.js';
import { BooksContext } from '../../context/BooksContext';

const IndividualBook = (props) => {
	const {
		book,
		rate,
		removeBook,
		updateBook,
		retrieveIndividualBook,
		borrowBook,
		returnBook,
		getBookRating,
	} = useContext(BooksContext);

	const [addReviewToggle, setAddReviewToggle] = useState(false);
	const [showReviewToggle, setShowReviewToggle] = useState(false);

	const { id } = props.match.params;
	const { image, title, author, borrowed, description, borrow_user } = book;

	useEffect(() => {
		retrieveIndividualBook(id);
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
	const adminDelete = role === 'admin' && (
  <NavLink to='/books'>
    <button onClick={() => removeBook(id)}>Delete Book</button>
  </NavLink>
	);

	//check if add review is active
	const addReview = addReviewToggle ? (
  <AddReview bookId={id} addReviewToggle={setAddReviewToggle} />
	) : (
  <NavLink to={'/books/' + id + '/reviews'}>
    <button onClick={() => setAddReviewToggle(true)}>Add review</button>
  </NavLink>
	);

	//show/hide reviews
	const showReview = !showReviewToggle ?
	(<button className='show-review-button' onClick={()=>{setShowReviewToggle(true)}}>Show Reviews</button>):
	(
  <div>
    <button className='hide-review-button' onClick={()=>{setShowReviewToggle(false)}}>Hide Reviews</button>
    <Reviews id={id} />
  </div>)


	return (
		//book info
		//reviews
  <div className='book'>
    <img src={image} alt='book-cover' />
    <div className='book-info'>
      <EditBook
        title={title}
        description={description}
        author={author}
        image={image}
        fixedRating={fixedRating}
        editBook={(data) => editBook(id, data)}
      />
      {adminDelete}
      <br />
      <BorrowButton
        borrowed={borrowed}
        borrowBook={() => borrowBook(id)}
        borrowUser={borrow_user}
        logedUser={logedUser}
        returnBook={() => returnBook(id)}
      />
      {addReview}
    </div>
    {/* <Reviews id={id} /> */}
    {showReview}
  </div>
	);
};

export default IndividualBook;
