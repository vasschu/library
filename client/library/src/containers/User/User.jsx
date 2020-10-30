import React, {useState, useEffect} from 'react';
import './User.css';
import {tokenData} from '../../common/common'
import userData from './../../data/userData';
import UserBookHistory from './../../components/UserBookHistory/UserBookHistory'

const User = () => {
const tokenPayload = tokenData()
const [points, setPoints] = useState(0)
const [booksHistory, setBooksHistory] = useState()
const [booksHistoryToggle, setBooksHistoryToggle] = useState(false)
const {sub, username, role} = tokenPayload

const readingPoints = () => {
userData.userPoints()
.then(res => setPoints(res.data.result))
}

const borrowedBooksHistory = () => {
userData.userBorrowdBooksHisotry()
.then(res => {
if(res.data.message){
  return res.data.message
} else {
  setBooksHistory(res.data)
}
})
}

const showBookHistory = booksHistoryToggle ? (
  <div className='bookHistory'>
    {booksHistory.map((el) => {
    return <UserBookHistory key={el.id} data={el} />
  })}
  </div>
  
):(
null
)

useEffect(() => {
  readingPoints()
  borrowedBooksHistory()
}, [points])

	return (
  <div className='card'>
    <br />
    <img src="https://developers.google.com/web/images/contributors/no-photo.jpg" style={{width: '25%'}} />
    <h1>
      {`Hello, ${username}`}
    </h1>
    <p className='title'>{`Library level: ${role}`}</p>
    <p className='title'>{`Your ID: ${sub}`}</p>
    <div>{`Current reading points: ${points}`}</div>
    <hr />
    <h3>{`${username}'s activity:`}</h3>
    <br />
    <button id='userHistory' onClick={() => setBooksHistoryToggle(prev => !prev)}>Books History</button>
    {showBookHistory}
    <br />
    <button id='userHistory'>Review History</button>
    <br />
    <button id='userHistory'>Likes History</button>
    <br />
  </div>
	);
};

export default User;
