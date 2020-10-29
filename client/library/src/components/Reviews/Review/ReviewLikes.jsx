import React, {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import {toastError} from './../../../common/toaster'
import reviewsData from './../../../data/reviewsData'


const ReviewLikes = (props) => {
  const {reviewId} = props
  const {id} = useParams()

  const reviewRatings = (bookId, reviewId) => {
  const reviewLikesData = reviewsData.getReviewLikes(bookId, reviewId)
  .then(res => {if(res.data.message){
    setLikes(0)
    setDislikes(0)
  } else {
  const likesAndDislikes =res.data.reduce((acc, el) => {
    el.rating ? acc.likes++ : acc.dislikes++
    return acc
  }, {likes: 0, dislikes: 0})
  setLikes(likesAndDislikes.likes)
  setDislikes(likesAndDislikes.dislikes)
  }})
}

const [likes, setLikes] = useState(0)
const [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    reviewRatings(id,reviewId)
  }, [id])



  //must implement logic here to update the numbers in proper way. must handle the errors
  const rateRevew = (bookId, reviewId, rating) => {
    reviewsData.likeReviewRating(bookId, reviewId, rating)
    .then(res => {if (res.data.res.message){
rating.rating ? setLikes(prev => prev + 1) : setDislikes(prev => prev + 1) 
    }
  })
  .catch(err => toastError(err.response.data.message))
  }


	return (
  <div className='review-likes'>    
    <p>{likes} of {likes + dislikes} users found this helpful</p>
    <p>Do you find this helpful</p>
    <button onClick={() => rateRevew(id, reviewId, {rating: 1})}>like</button>
    <button onClick={() => rateRevew(id, reviewId, {rating: 0})}>dislike</button>
  </div>
    )
};

ReviewLikes.propTypes = {
  reviewId: PropTypes.number,
  };


export default ReviewLikes;
