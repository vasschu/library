import React, {useState, useEffect} from 'react';
import './UsersAdmin.css';
import {tokenData} from '../../common/common'
import userData from '../../data/userData';
import UserBookHistory from '../../components/UserBookHistory/UserBookHistory'
import {useTable} from 'react-table'

const UsersAdmin = () => {
const tokenPayload = tokenData()
const {role} = tokenPayload

const getAllUsers = () => {
  userData.getAllUser()
  .then(res => res.data)}
  const usersList = getAllUsers()

console.log(usersList);

const [userList, setUserList] = useState(usersList)
setUserList(getAllUsers())
console.log(userList);

useEffect(()=>{}, [])

	return (
  <div className='userslist'>
    {userList.map(el => {return(
      <div className='user-info' key={el.id}>
        <hr />
        <ul>
          <li>{`id: ${el.id} `}</li>
          <li>{`user: ${el.username} `}</li>
          <button>Delete User</button>
          <button>Ban User</button>
          <hr />
        </ul>
      </div>)})}
  </div>
	);
};

export default UsersAdmin;
