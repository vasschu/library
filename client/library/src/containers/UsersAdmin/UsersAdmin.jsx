import React, {useState, useEffect} from 'react';
import './UsersAdmin.css';
import {tokenData} from '../../common/common'
import userData from '../../data/userData';
import UsersLists from './../../components/UsersList/UsersList'
import { handleError } from '../../common/handleErrors';
import { toastSuccess } from '../../common/toaster';

const UsersAdmin = () => {
const tokenPayload = tokenData()
const {role} = tokenPayload

const [currentUsers, setCurrentUsers] = useState([])

const getAllUsers = () => {
  userData.getAllUser()
  .then(res => {
    setCurrentUsers([...res.data])
  })
  .catch(handleError)}

  const deleteUser = (userId) => {
    userData.deleteUser(userId)
    .then(res =>console.log(res.data))
    .catch(handleError)}

  const banUser = (userId, reason) => {
    const banData = {
      user_id: userId,
      reason: reason}

    userData.banUser(banData)
    .then(res =>{
      const bannedUser = currentUsers.find(el => el.id === banData.user_id)
      bannedUser.is_banned = true
      const copyOfUsers = [...currentUsers]
      setCurrentUsers([...copyOfUsers])
      toastSuccess(res.data)})
    .catch(handleError)}

	useEffect(() => {
		getAllUsers();
	}, []);


	return (
  <>
    <div className='userslist'>
      {currentUsers.map(entry => <UsersLists key={entry.id} data={entry} banUser={banUser} deleteUser={deleteUser} />)}
    </div>
  </>
	);
};

export default UsersAdmin;
