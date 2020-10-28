import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {tokenData} from './../../../common/common'
import userData from './../../../data/reviewsData'



const AddReview = (props) => {
	const { bookId, addReviewToggle, reviews, setReview } = props;
	const [title, onChangeTitle] = useState('');
  const [body, onChangeBody] = useState('');

	const updateTitle = (value) => onChangeTitle(value);
	const updateBody = (value) => onChangeBody(value);

  const tokenPayload = tokenData()
	const data = {
		title: title,
		content: body,
		users_id: tokenPayload.sub,
		books_id: bookId,
	};

	const addReview = () => {
		userData.addReview(bookId, data)
    .then(res => {
    const newReview = {
    content: res.data.content,
    id: res.data.id,
    title: res.data.id,
    username: res.data.username,
    }
    const reviewsCopy = [...reviews, newReview]

    setReview(reviewsCopy)
    {addReviewToggle(false)}})
.catch(err => alert(err))	
  }

	return (
  <div className='add-review'>
    <span>Note: will toggle this section with the button above</span>
    <br />
    <span>Title</span>
    <input
      placeholder='Title'
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChange={(e) => updateTitle(e.target.value)}
      value={title}
    />
    <br />
    <span>Review</span>
    <input
      placeholder='Review'
      style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
      onChange={(e) => updateBody(e.target.value)}
      value={body}
    />
    <p>
      {' '}
      must find a way to place rating here. Stars maybe? Select from list?
    </p>
    <button className='save-review-button' onClick={addReview}>
      Save
    </button>
    <button className='cancel-review-button' onClick={() => addReviewToggle(false)}>
      Close
    </button>
  </div>
	);
};

AddReview.propTypes = {
	bookId: PropTypes.string,
  addReviewToggle: PropTypes.func,
	reviews: PropTypes.array,
	setReview: PropTypes.func,
	  };

export default AddReview;
