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

  const banStatus = data.is_banned ? 'Banned' : 'Not Banned';

	return (
  <>
    <tbody>
      <tr>
        <th>{data.id}</th>
        <td>{data.username}</td>
        <td>{banStatus}</td>
        <td><button className='close-edit-review-button' onClick={deleteEntry}>Delete</button></td>
        <td><button className='close-edit-review-button' onClick={banEntry}>Ban</button></td>
      </tr>
    </tbody>
  </>
	);
  }

export default UsersList;
