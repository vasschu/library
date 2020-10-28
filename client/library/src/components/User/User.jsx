import React from 'react';
import './User.css';
import {tokenData} from './../../common/common'

const User = () => {
const tokenPayload = tokenData()

const {sub, username, role} = tokenPayload

const readingPoints = 5000

	//display the current reading points

	//info for the user must be extracted but new endpoints must be created
	// get history of all books borrowed by the user - (avaialble)
	// get history of book ratings given - (must implement)
	// get history of review likes - (must implement)

	return (
  <div className='user'>
    <h1>
      {`Hello ${username}`}
    </h1>
    <br />
    <div>{`Library level: ${role}`}</div>
    <br />
    <div>{`Your ID: ${sub}`}</div>
    <br />
    <div>{`Current reading points: ${readingPoints}`}</div>
    <br />

    <div>toggle container for history of borrowed books</div>
    <div>toggle container for all reviews left by this user</div>
    <div>toggle container for all likes given by this user</div>
  </div>
	);
};

export default User;
