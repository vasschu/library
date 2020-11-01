import React from 'react';
import Review from '../../components/Review/Review'
import PropTypes from 'prop-types';
import reviewData from '../../data/reviewsData'
import {toastSuccess, toastError} from '../../common/toaster'
import { handleError } from '../../common/handleErrors';



const Reviews = (props) => {
	const { id, userId, userToken, role, reviews, setReview } = props;


		const deleteReview = (bookId, reviewId) => {
			reviewData.deleteReview(bookId, reviewId)
			.then(res => {const reviewsWithoutDeleted = reviews.filter(r => r.id !== res.data.id)
			setReview(reviewsWithoutDeleted)
			toastSuccess('Review Removed')
			})
			.catch(handleError)
		  };
			
	const updateReviews = (bookId, reviewId, data) => {
		reviewData.editReview(bookId, reviewId, data)
		.then((res) => { 
			if(!res.data.message) {
				const reviewIndex = reviews.findIndex(el=> el.id === reviewId)
				const copy = [...reviews]
				const updatedReview = reviews[reviewIndex]
				updatedReview.title = res.data.title
				updatedReview.content = res.data.content
				copy[reviewIndex] = updatedReview

				setReview(copy)
				toastSuccess('Review Updated')
		}})
		.catch(handleError)	
	}


	const displayReviews = reviews.length ? 
	(
  <div className='review'>
    {reviews.map((r) => {
	return <Review
  key={r.id}
  review={r}
  bookId={id}
  deleteReview={deleteReview}
  updateStateUpdate={updateReviews}
  userToken={userToken}
  role={role}
  userId={userId}
	       />;})}
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
	userToken: PropTypes.string,
	role: PropTypes.string,
	reviews: PropTypes.array,
	setReview: PropTypes.func,
	userId: PropTypes.number
  };

export default Reviews;
