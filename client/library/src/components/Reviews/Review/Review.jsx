import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import PropTypes from 'prop-types';



const Review = (props) => {
	const deleteReview = (id) => {
		console.log(`Delete Data ${id}`);
	};

	const {title, content, username, id} = props.review
	
	return (
  <div className='review'>
    <hr />
    <p>Title: {title}</p>
    <hr />
    <p>Review:{content}</p>
    <p>From: {username}</p>
    <DeleteButton id={id} deleteFunction={deleteReview} />
    <EditButton id={id} />
  </div>
	);
};

Review.propTypes = {
review: PropTypes.object,
  };


export default Review;
