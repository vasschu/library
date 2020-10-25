import React, { useState, useEffect } from 'react';
import Review from './Review/Review';
import reviewData from '../../data/reviewsData';
import PropTypes from 'prop-types';


const Reviews = (props) => {
	const { id } = props;

	const [reviews, setReview] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		reviewData
			.getReviews(id)
			.then((res) => setReview(res.data))
			.catch((err) => setError(err));
	}, [id, reviews]);

	return (
  <div className='review'>
    {reviews.map((r) => {
				return <Review key={r.id} review={r} />;
			})}
  </div>
	);
};

Reviews.propTypes = {
	id: PropTypes.number,
  };

export default Reviews;
