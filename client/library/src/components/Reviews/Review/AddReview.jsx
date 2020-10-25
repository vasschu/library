import React, { useState} from 'react';
import SaveButton from './SaveButton';
import PropTypes from 'prop-types';


const AddReview = (props) => {
	const { bookId, addReviewToggle } = props;
	const [title, onChangeTitle] = useState('');
	const [body, onChangeBody] = useState('');

	const updateTitle = (value) => onChangeTitle(value);
	const updateBody = (value) => onChangeBody(value);

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
    <button className='cancel-review-button' onClick={() => addReviewToggle(false)}>
      Close
    </button>
    <SaveButton onclicktitle={title} body={body} userId={1} bookId={bookId} />
  </div>
	);
};

AddReview.propTypes = {
	bookId: PropTypes.number,
	addReviewToggle: PropTypes.func,
	  };

export default AddReview;
