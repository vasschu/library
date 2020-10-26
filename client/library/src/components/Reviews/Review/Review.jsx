import React, {useState} from 'react';
import PropTypes from 'prop-types';
import userData from './../../../data/reviewsData'

const Review = (props) => {
  const {title, content, username, id } = props.review
  const {bookId, test, updateStateUpdate } = props
  
const [updateMode, setModeUpdate] = useState(false);
const [viewContent, setViewText] = useState(content);
const [viewTitle, setViewTitle] = useState(title);

const deleteReview = (bookId, reviewId) => {
  userData.deleteReview(bookId, reviewId)
  .then(test(bookId))
};

const saveEdit = () => {
  updateStateUpdate(bookId, id, { title: viewTitle, content: viewContent });
  setModeUpdate(false)
};

	return (
  <div className='review'>
    {updateMode ? (
      <>
        <input
          placeholder="title"
          value={viewTitle}
          onChange={(ev) => setViewTitle(ev.target.value)}
        />
        <br />
        <input
          placeholder="Review"
          value={viewContent}
          onChange={(ev) => setViewText(ev.target.value)}
        />
        <br />
        <button className='save-review-button' onClick={saveEdit}>
          Save
        </button>
        <button className='close-edit-review-button' onClick={() => setModeUpdate(false)}>Cancel</button>
      </>
      ) : ( 
        <>
          <hr />
          <p>Title: {title}</p>
          <hr />
          <p>Review:{content}</p>
          <p>From: {username}</p>
          <button className='delete-review-button' onClick={() => deleteReview(bookId, id)}>
            Delete
          </button>
          <button className='edit-review-button' onClick={() => setModeUpdate(true)}>Edit</button>
        </>
    )}

  </div>
  
	);
};

Review.propTypes = {
review: PropTypes.object,
bookId: PropTypes.string,
test: PropTypes.func,
updateStateUpdate: PropTypes.func
  };


export default Review;
