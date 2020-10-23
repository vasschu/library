/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from './../../data/userService'

const RegisterPage = () => {
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

	const data = { username: user, password: pass };

  let history = useHistory();

  const registerUser = () => {
    // userService.create(data)
	const registerUser = () => {
		fetch(`http://localhost:5500/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
        if(res.user) {
          alert(`${res.message} Click OK to be redirected to login`)
          history.push('/login')
        } else {
          throw new Error (res.message)
        }
			})
      .catch((err) => alert(err))
	};

	const updateUser = (value) => setUser(value);
	const updatePass = (value) => setPass(value);

	return (
  <div className='login-page-layout'>
    <div className='call-to-action'>
      <h1 className='call-to-action-text'>
        Register to get access to the world's greatest stories
      </h1>
      <br />
      <span>User</span>
      <input
        placeholder='username..'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => updateUser(e.target.value)}
        value={user}
      />
      <br />
      <span>Pass</span>
      <input
        type='password'
        placeholder='password..'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => updatePass(e.target.value)}
        value={pass}
      />
      <br />
      <button className='register-button' onClick={registerUser}>
        Register
      </button>
    </div>
  </div>
	);
};

export default RegisterPage;
