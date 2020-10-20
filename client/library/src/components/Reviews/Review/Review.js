import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const Review = (props) => {
	const [review, setReview] = useState([]);
	const [error, setError] = useState(null);

	//must create logic to edit review
	//must create logic to dislay edit and delete button only when needed.

	return (
		<div className='review'>
			<hr />
			<h5>Title: {props.review.title}</h5>
			<hr />
			<p>Review:{props.review.content}</p>
			<p>From: {props.review.username}</p>
			<DeleteButton id={props.review.id} />
			<EditButton id={props.review.id} />
		</div>
	);
};

export default Review;
