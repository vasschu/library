import React, {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import {toastError, toastRole} from './../../../common/toaster'
import reviewsData from './../../../data/reviewsData'


const ReviewLikes = (props) => {
  const {reviewId, userId} = props
  const {id} = useParams()

const [likes, setLikes] = useState(0)
const [dislikes, setDislikes] = useState(0)
const [likeToggle, setLikeToggle] = useState(false)
const [dislikeToggle, setDislikeToggle] = useState(false)

  const reviewRatings = (bookId, reviewId) => {
  reviewsData.getReviewLikes(bookId, reviewId)
  .then(res => {if(res.data.message){
    setLikes(0)
    setDislikes(0)
  } else {
  const likesAndDislikes =res.data.reduce((acc, el) => {
    el.rating ? acc.likes++ : acc.dislikes++
    if(el.user_id === userId) {
      el.rating ? setLikeToggle(true) : setDislikeToggle(true)
    }
    return acc
  }, {likes: 0, dislikes: 0})
  setLikes(likesAndDislikes.likes)
  setDislikes(likesAndDislikes.dislikes)
  }})
}

  //must implement logic here to update the numbers in proper way. must handle the errors
  const rateRevew = (bookId, reviewId, rating) => {
    reviewsData.likeReviewRating(bookId, reviewId, rating)
    .then(res => {
      if (res.data.level) {
        toastRole(res.data.level);
      }

      if (res.data.res.message){
        if(rating.rating) {
          setLikes(prev => prev + 1)
          setLikeToggle(true)
          setDislikeToggle(false)}
        else {
          setDislikes(prev => prev + 1) 
          setLikeToggle(false) 
          setDislikeToggle(true)} 
        }
  })
  .catch(err => toastError(err.response.data.message))
  }

  useEffect(() => {
    reviewRatings(id,reviewId)
  }, [rateRevew])

	return (
  <div className='review-likes'>    
    <p>{likes} of {likes + dislikes} users found this helpful</p>
    <p>Do you find this helpful</p>
    <button
      className={likeToggle ? 'borrow-unavailable-btn' : 'borrow-available-btn'}
      disabled={likeToggle}
      onClick={() => rateRevew(id, reviewId, {rating: 1})}
    >like
    </button>
    <button
      className={dislikeToggle ? 'borrow-unavailable-btn' : 'borrow-available-btn'}
      disabled={dislikeToggle}
      onClick={() => rateRevew(id, reviewId,
    {rating: 0})}
    >dislike
    </button>
  </div>
    )
};

ReviewLikes.propTypes = {
  reviewId: PropTypes.number,
  userId: PropTypes.number
  };


export default ReviewLikes;
