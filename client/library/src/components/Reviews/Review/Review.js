import React, { useState, useEffect } from 'react';

const Review = (props) => {
	const [review, setReview] = useState([]);
	const [error, setError] = useState(null);

	return (
  <div className='review'>
    <hr />
    <h5>Title: {props.review.title}</h5>
    <hr />
    <p>Review:{props.review.content}</p>
    <p>From: {props.review.username}</p>
  </div>
	);
};

export default Review;
