/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';



const UsersList = (props) => {
const {data} = props

console.log(data);

	return (
  <div className='user-info'>
    <div>{`user: ${data.username}`}</div>
    <br />
    <div>{`User Status: ${data.is_banned}`}</div>
    <br />
    <button className='close-edit-review-button' onClick={() => console.log(`Delete ${data.username}`)}>Delete</button>
    <button className='close-edit-review-button' onClick={() => console.log(`Ban ${data.username}`)}>Ban</button>
    <hr />
  </div>
	);
  }

export default UsersList;
