import React from 'react';
import PropTypes from 'prop-types';
import userData from './../../../data/reviewsData'

const Review = (props) => {

const {title, content, username, id } = props.review
const {bookId, update } = props

const deleteReview = (bookId, reviewId) => {
  userData.deleteReview(bookId, reviewId)
  // .then(res => alert(res.data.message))
  update(bookId)
};

	return (
  <div className='review'>
    <hr />
    <p>Title: {title}</p>
    <hr />
    <p>Review:{content}</p>
    <p>From: {username}</p>
    <button className='delete-review-button' onClick={() => deleteReview(bookId, id)}>
      Delete
    </button>
    <button className='edit-review-button'>Edit</button>
  </div>
	);
};

Review.propTypes = {
review: PropTypes.object,
bookId: PropTypes.string,
update: PropTypes.func
  };


export default Review;
