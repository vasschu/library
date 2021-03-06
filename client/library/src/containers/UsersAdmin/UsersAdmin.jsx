import React, {useState, useEffect} from 'react';
import './UsersAdmin.css';
import userData from '../../data/userData';
import UsersLists from './../../components/UsersList/UsersList'
import { handleError } from '../../common/handleErrors';
import { toastSuccess } from '../../common/toaster';
import { Table } from 'reactstrap';

const UsersAdmin = () => {


const [currentUsers, setCurrentUsers] = useState([])

const getAllUsers = () => {
  userData.getAllUser()
  .then(res => {
    setCurrentUsers([...res.data])
  })
  .catch(handleError)}

  const deleteUser = (userId) => {
    userData.deleteUser(userId)
    .then(res => {
      console.log(res.data);
    const newUsersList = currentUsers.filter(el => el.id !== userId)
    console.log(newUsersList);
    setCurrentUsers([...newUsersList])
    toastSuccess(res.data.message)
    })
    .catch(handleError)
  }

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
    <Table className='userslist'>
      <thead>
        <tr>
          <th>id</th>
          <th>Username</th>
          <th>Ban Status</th>
          <th>Delete</th>
          <th>Ban</th>
        </tr>
      </thead>
      {currentUsers.map(entry => <UsersLists key={entry.id} data={entry} banUser={banUser} deleteUser={deleteUser} />)}
    </Table>
  </>
	);
};

export default UsersAdmin;
