/* eslint-disable react/prop-types */
import React from 'react';




const UsersList = (props) => {
const {data, banUser, deleteUser} = props

const reason = 'You are banned'

const banEntry = () => {
banUser(data.id, reason)
}

const deleteEntry = () => {
  deleteUser(data.id)
  }

	return (
  <div className='user-info'>
    <div>{`user: ${data.username}`}</div>
    <br />
    <div>{`Ban status: ${data.is_banned}`}</div>
    <br />
    <button className='close-edit-review-button' onClick={deleteEntry}>Delete</button>
    <button className='close-edit-review-button' onClick={banEntry}>Ban</button>
    <hr />
  </div>
	);
  }

export default UsersList;
