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
			
	const updateReviews = (bookId, reviewId, data) => {
		reviewData.editReview(bookId, reviewId, data)
		.then((res) => {if(res.data.message === 'The review was updated successfully')
		{
			const reviewIndex = reviews.findIndex(el=> el.id === reviewId)
			const copy = [...reviews]
			copy[reviewIndex] = "" /*updatedReview*/
		}
	})}
			
	useEffect(() => {
	fetchReviews(id);
	},[]);


	const displayReviews = reviews.length ? 
	(
  <div className='review'>
    {reviews.map((r) => {return <Review key={r.id} review={r} bookId={id} test={fetchReviews} updateStateUpdate={updateReviews} />;})}
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
