/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import userService from './../../data/userService'


const LoginPage = () => {
	const [user, onChangeUser] = useState('');
  const [pass, onChangePass] = useState('');
  let history = useHistory();
  

	const { setLoginState } = useContext(AuthContext);

	const data = { username: user, password: pass };

	const loginUser = (data) => {userService.loginUser(data)
		// fetch(`http://localhost:5500/auth/session`, {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(data),
		// })
			.then((res) => res.json())
			.then((res) => { 
				if (res.token) {
          alert('Successful login, please click OK to enter the temple of knowledge')
          setLoginState(true, res.token);
          history.push('/books')
				} else {
          throw new Error (res.message)
        }
			})
			.catch((err) => alert(err));
	};

	const updateUser = (value) => onChangeUser(value);
	const updatePass = (value) => onChangePass(value);

	return (
  <div className='login-page-layout'>
    <div className='call-to-action'>
      <h1 className='call-to-action-text'>
        Login to get access to the world's greatest stories
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
      <button className='login-button' onClick={loginUser}>
        Login
      </button>
    </div>
  </div>
	);
};

export default LoginPage;
