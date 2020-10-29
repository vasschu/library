import React, {useState, useEffect} from 'react';
import './User.css';
import {tokenData} from '../../common/common'
import userdata from './../../data/userData'
import userData from './../../data/userData';

const User = () => {
const tokenPayload = tokenData()

const [points, setPoints] = useState(0)

const {sub, username, role} = tokenPayload

const readingPoints = () => {
userData.userPoints()
.then(res => setPoints(res.data.result))
}

useEffect(() => {
  readingPoints()
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
    <br />
    <div>{`Current reading points: ${points}`}</div>
    <br />
    <button id='userHistory'>Books History</button>
    <br />
    <button id='userHistory'>Review History</button>
    <br />
    <button id='userHistory'>Likes History</button>
    <br />
  </div>
	);
};

export default User;
