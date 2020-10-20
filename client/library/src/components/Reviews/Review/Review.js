import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const Review = (props) => {
	
	return (
		<div className='review'>
			<hr />
			<p>Title: {props.review.title}</p>
			<hr />
			<p>Review:{props.review.content}</p>
			<p>From: {props.review.username}</p>
			<DeleteButton id={props.review.id} />
			<button className='edit-review-button'>Edit</button>
		</div>
	);
};

export default Review;
