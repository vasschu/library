import React, {useState } from 'react';
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import {tokenData} from './../../../common/common'
import {toastError} from './../../../common/toaster'
import reviewsData from './../../../data/reviewsData'

toast.configure()



const ReviewLikes = (props) => {
  const {reviewId} = props
 
  const {id} = useParams()
  
  const data = {likes: 5,
    dislikes: 2}

  const [likes, setLikes] = useState(data.likes)
  const [dislikes, setDislikes] = useState(data.dislikes)


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
