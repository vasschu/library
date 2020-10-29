import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReviewLikes from './ReviewLikes'


const Review = (props) => {
  const {title, content, username, id } = props.review
  const {bookId, deleteReview, updateStateUpdate, userToken, role, userId } = props
  
const [updateMode, setModeUpdate] = useState(false);
const [viewContent, setViewText] = useState(content);
const [viewTitle, setViewTitle] = useState(title);

const canEdit = (role === 'admin' || userToken === username) && (
  <div>
    <button className='delete-review-button' onClick={() => deleteReview(bookId, id)}>
      Delete
    </button>
    <button className='edit-review-button' onClick={() => setModeUpdate(true)}>Edit</button>
  </div>)

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
          <p>Review:{content}</p>
          <p>From: {username}</p>
          {canEdit}
          <ReviewLikes reviewId={id} userId={userId} />
          <hr />
        </>
    )}

  </div>
  
	);
};

Review.propTypes = {
review: PropTypes.object,
bookId: PropTypes.string,
userToken: PropTypes.string,
role: PropTypes.string,
deleteReview: PropTypes.func,
updateStateUpdate: PropTypes.func,
userId: PropTypes.number
  };


export default Review;
