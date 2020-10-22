/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { AuthContext } from './../Context/AuthContext';

const LoginPage = () => {
	const [user, onChangeUser] = useState('');
	const [pass, onChangePass] = useState('');

	const { setLoginState } = useContext(AuthContext);

	const data = { username: user, password: pass };

	const login = () => {
		fetch(`http://localhost:5500/auth/session`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				if (typeof res.token === 'string' && res.token.length > 20) {
					console.log('token recieved');
					setLoginState(true, res.token);
				}
			})
			.catch((err) => console.log(err));
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
      <button className='login-button' onClick={login}>
        Login
      </button>
    </div>
  </div>
	);
};

export default LoginPage;
