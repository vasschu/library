import React from 'react';
import './User.css';
import {tokenData} from '../../common/common'

const User = () => {
const tokenPayload = tokenData()

const {sub, username, role} = tokenPayload

//implement 
const readingPoints = 5000




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
    <div>{`Current reading points: ${readingPoints}`}</div>
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
