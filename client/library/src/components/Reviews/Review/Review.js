import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const Review = (props) => {
	const deleteReview = (id) => {
		console.log(`Delete Data ${id}`);
	};

	
	return (
		<div className='review'>
			<hr />
			<p>Title: {props.review.title}</p>
			<hr />
			<p>Review:{props.review.content}</p>
			<p>From: {props.review.username}</p>
			<DeleteButton id={props.review.id} deleteFunction={deleteReview} />
			<EditButton id={props.review.id} />
		</div>
	);
};

export default Review;
