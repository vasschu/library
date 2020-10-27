import React, { useState, useEffect } from 'react';
import Review from './Review/Review';
import reviewData from '../../data/reviewsData';
import PropTypes from 'prop-types';



const Reviews = (props) => {
	const { id } = props;
	
	const [reviews, setReview] = useState([]);
	const [error, setError] = useState(null);

	
	const fetchReviews = (id) => {
		reviewData
		.getReviews(id)
		.then((res) => setReview([...res.data]))
		.catch((err) => setError(err))}

		const deleteReview = (bookId, reviewId) => {
			reviewData.deleteReview(bookId, reviewId)
			.then(res => {const reviewsWithoutDeleted = reviews.filter(r => r.id !== res.data.id)
			setReview(reviewsWithoutDeleted)
			})
		  };
			
	const updateReviews = (bookId, reviewId, data) => {
		reviewData.editReview(bookId, reviewId, data)
		.then((res) => { if(!res.data.message)
		{
		const reviewIndex = reviews.findIndex(el=> el.id === reviewId)
		const copy = [...reviews]
		const updatedReview = reviews[reviewIndex]
		updatedReview.title = res.data.title
		updatedReview.content = res.data.content
		copy[reviewIndex] = updatedReview

		setReview(copy)
		}})
	}
			
	useEffect(() => {
	fetchReviews(id);
	},[]);


	const displayReviews = reviews.length ? 
	(
  <div className='review'>
    {reviews.map((r) => {return <Review key={r.id} review={r} bookId={id} deleteReview={deleteReview} updateStateUpdate={updateReviews} />;})}
  </div>)
  : (
    <div className='review'>
      No reviews published.  
    </div>)
	return (
  <div className='review'>
    {displayReviews}
  </div>
	);
};

Reviews.propTypes = {
	id: PropTypes.string,
  };

export default Reviews;
