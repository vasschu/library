import React, { useState, useEffect, TextInput } from 'react';
import SaveButton from './SaveButton';

const AddReview = (props) => {
	const { bookId } = props;
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
    <SaveButton onclicktitle={title} body={body} userId={1} bookId={bookId} />
  </div>
	);
};

export default AddReview;
