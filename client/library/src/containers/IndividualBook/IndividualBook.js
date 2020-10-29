import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../../components/Reviews/Review/AddReview';
import BorrowButton from '../../components/Book/BorrowButton';
import Reviews from '../../components/Reviews/Reviews';
import EditBook from '../../components/EditBook/EditBook';
import Rate from '../../components/Rate/Rate';
import { tokenData } from '../../common/common.js';
import { BooksContext } from '../../context/BooksContext';
import PropTypes from 'prop-types';
import reviewData from './../../data/reviewsData';

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
		rateBook,
	} = useContext(BooksContext);

	const [addReviewToggle, setAddReviewToggle] = useState(false);
	const [showReviewToggle, setShowReviewToggle] = useState(false);
	const [reviews, setReview] = useState([]);

	const tokenPayload = tokenData();
	const { id } = props.match.params;
	const { image, title, author, borrowed, description, borrow_user } = book;
	const { sub: logedUser, role, username } = tokenPayload;
	const { rating } = rate;
	const fixedRating = !rating ? 'none' : rating.toFixed();

	useEffect(() => {
		retrieveIndividualBook(id);
		fetchReviews(id);
	}, [id]);

	useEffect(() => {
		getBookRating(id);
	}, [id]);

	//fetch review data
	const fetchReviews = (id) => {
		reviewData.getReviews(id).then((res) => setReview([...res.data]));
		// .catch((err) => toast(err));
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
		<div className='book'>
			<img src={image} alt='book-cover' />
			<div className='book-info'>
				<span>Rating: {fixedRating} / 5</span>
				<Rate rate={(userRating) => rateBook(id, userRating)} />
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
			<hr />
			{showReview}
			<hr />
		</div>
	);
};

export default IndividualBook;

IndividualBook.propTypes = {
	match: PropTypes.object,
};
