import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {tokenData} from './../../../common/common'


const ReviewLikes = (props) => {
  const {reviewId} = props
  const userId = tokenData.username

  const data = {likes: 5,
    dislikes: 2}
    

  const [likes, setLikes] = useState(data.likes)
  const [dislikes, setDislikes] = useState(data.dislikes)

	return (
  <div className='review-likes'>    
    <p>{likes} of {likes + dislikes} users found this helpful</p>
    <p>Do you find this helpful</p>
    <button onClick={()=>{setLikes(likes+1)}}>like</button>
    <button onClick={()=>{setDislikes(dislikes+1)}}>dislike</button>
  </div>
    )
};

ReviewLikes.propTypes = {
  reviewId: PropTypes.number,
  };


export default ReviewLikes;
