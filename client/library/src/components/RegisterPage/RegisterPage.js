/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const RegisterPage = () => {
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

	const { setLoginState } = useContext(AuthContext);

	const data = { username: user, password: pass };

	const register = () => {
		fetch(`http://localhost:5500/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('Registration done');
			})
			.catch((err) => console.log(err));
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
      <button className='register-button' onClick={register}>
        Register
      </button>
    </div>
  </div>
	);
};

export default RegisterPage;
