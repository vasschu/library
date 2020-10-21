import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Review from './Review/Review';

const Reviews = (props) => {
	const { id } = props;

	const [reviews, setReview] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:5500/books/${id}/reviews/`)
			.then((res) => res.json())
			.then((reviews) => setReview(reviews))
			.catch((err) => setError(err));
	}, []);

	return (
		<div className='review'>
			{reviews.map((r) => {
				return <Review key={r.id} review={r} />;
			})}
		</div>
	);
};

export default Reviews;
