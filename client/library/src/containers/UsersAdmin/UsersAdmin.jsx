import React, {useState, useEffect} from 'react';
import './UsersAdmin.css';
import {tokenData} from '../../common/common'
import userData from '../../data/userData';
import UsersLists from './../../components/UsersList/UsersList'

const UsersAdmin = () => {
const tokenPayload = tokenData()
const {role} = tokenPayload

const [currentUsers, setCurrentUsers] = useState([])

const getAllUsers = () => {
  userData.getAllUser()
  .then(res => {
    setCurrentUsers([...res.data])
  })}

	useEffect(() => {
		getAllUsers();
	}, []);


	return (
  <>
    <div className='userslist'>
      {currentUsers.map(entry => <UsersLists key={entry.id} data={entry} />)}
    </div>
  </>
	);
};

export default UsersAdmin;
