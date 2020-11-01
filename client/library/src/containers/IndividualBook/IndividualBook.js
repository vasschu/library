import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../../components/Review/AddReview';
import BorrowButton from '../../components/Book/BorrowButton';
import Reviews from '../Reviews/Reviews';
import EditBook from '../../components/EditBook/EditBook';
import Rate from '../../components/Rate/Rate';
import { tokenData } from '../../common/common.js';
import PropTypes from 'prop-types';
import reviewData from './../../data/reviewsData';
import { toastSuccess, toastRole } from '../../common/toaster.js'
import BooksService from '../../data/booksData.js'
import { handleError } from '../../common/handleErrors.js'
import './IndividualBook.css'


const IndividualBook = (props) => {

	const [addReviewToggle, setAddReviewToggle] = useState(false);
	const [showReviewToggle, setShowReviewToggle] = useState(false);
	const [reviews, setReview] = useState([]);
	const [book, setBook] = useState({});
	const [rate, setRate] = useState('');
	

	const tokenPayload = tokenData();
	const { id } = props.match.params;
	const { image, title, author, borrowed, description, borrow_user } = book;
	const { sub: logedUser, role, username } = tokenPayload;
	const { rating } = rate;
  	const currentRating = !rating ? 'none' : rating.toFixed(2);


	const removeBook = (id) => {
		BooksService.deleteBook(id)
			.then((resBook) => {
				setBook(resBook.data);
				toastSuccess('The book was deleted successfully!');
			})
			.catch(handleError);
	};

	const updateBook = (id, info) => {
		BooksService.editBook(id, info)
			.then((resBook) => {
				setBook(resBook.data);
				toastSuccess('The book was updated successfully!');
			})
			.catch(handleError);
	};

	const retrieveIndividualBook = (id) => {
		BooksService.getBookById(id)
			.then((resBook) => setBook(resBook.data))
			.catch(handleError);
	};

	const borrowBook = (id) => {
		BooksService.borrowBook(id)
			.then((resBook) => setBook(resBook.data))
			.catch(handleError);
	};

	const returnBook = (id) => {
		BooksService.returnBook(id)
			.then((resBook) => {
				setBook(resBook.data.res);
				if (resBook.data.level && resBook.data.level !== tokenPayload.role) {
					toastRole(resBook.data.level);
				}
			})
			.catch(handleError);
	};

	const getBookRating = (id) => {
		BooksService.getBookRating(id)
			.then((bookRate) => setRate(bookRate.data))
			.catch(handleError);
	};

	const rateBook = (id, rating) => {
		BooksService.rateBook(id, rating)
			.then((res) => {
				const newRating = res.data.message;
				const newBook = {...book, ...newRating};
				setBook(newBook);
				toastSuccess('The book was rated successfully!');

				if (res.data.level && res.data.level !== tokenPayload.role) {
					toastRole(res.data.level);
				}
			})
			.catch(handleError);
	};

	useEffect(() => {
		retrieveIndividualBook(id);
		fetchReviews(id);
	}, [id]);

	useEffect(() => {
		getBookRating(id);
	}, [id, book]);

	//fetch review data
	const fetchReviews = (id) => {
		reviewData.getReviews(id)
			.then((res) => setReview([...res.data]))
			.catch(handleError);
	};

	// check if admin
	const adminDelete = role === 'admin' && (
  <NavLink to='/books'>
    <button onClick={() => removeBook(id)}>Delete Book</button>
  </NavLink>
	);

	//check if add review is active
	const addReview = addReviewToggle ? (
  <AddReview
    bookId={id}
    addReviewToggle={setAddReviewToggle}
    reviews={reviews}
    setReview={setReview}
  />
	) : (
  <NavLink to={'/books/' + id + '/reviews'}>
    <button onClick={() => setAddReviewToggle(true)}>Add review</button>
  </NavLink>
	);

	//show/hide reviews
	const showReview = !showReviewToggle ? (
  <button
    className='show-review-button'
    onClick={() => {
				setShowReviewToggle(true);
    }}
  >
    Show Reviews
  </button>
	) : (
  <div>
    <button
      className='hide-review-button'
      onClick={() => {
					setShowReviewToggle(false);
      }}
    >
      Hide Reviews
    </button>
    <Reviews
      id={id}
      userId={logedUser}
      userToken={username}
      role={role}
      reviews={reviews}
      setReview={setReview}
    />
  </div>
	);

	return (
		//book info
		//reviews
  <>
    <div className='individual-book'>
      <img src={image} alt='book-cover' />
      <div className='book-info'>
        <h5>Rating: {currentRating} / 5</h5>
        <Rate rate={(userRating) => rateBook(id, userRating)} />
        <br />
        <br />
        <EditBook
          title={title}
          description={description}
          author={author}
          image={image}
          role={role}
          editBook={(data) => updateBook(id, data)}
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
      <br />
    </div>
    <hr />
    {showReview}
    {/* <hr /> */}
  </>
	);
};

export default IndividualBook;

IndividualBook.propTypes = {
	match: PropTypes.object,
};
