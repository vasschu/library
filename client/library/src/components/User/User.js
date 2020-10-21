import React, { useEffect, useState, Fragment } from 'react';
import './User.css'

const User = () => {
	//we will extract the following info from the Token
	//ID
	//Username
	//Role

	//display the current reading points

	//info for the user must be extracted but new endpoints must be created
	// get history of all books borrowed by the user - (avaialble)
	// get history of book ratings given - (must implement)
	// get history of review likes - (must implement)

	return (
  <div className="user">
    <h1>
      User info will follow here. Tokens and some backend rework will be
      needed. Data is now created with dummy info
    </h1>
    <div>User name: Vasko</div>
    <br />
    <div>User Level: Admin</div>
    <br />
    <div>User Points: 5000</div>
    <br />

    <div>toggle container for history of borrowed books</div>
    <div>toggle container for all reviews left by this user</div>
    <div>toggle container for all likes given by this user</div>
  </div>
	);
};

export default User;
