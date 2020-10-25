import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import userData from './../../data/userData'


const LoginPage = () => {
	const [user, onChangeUser] = useState('');
  const [pass, onChangePass] = useState('');
  let history = useHistory();
  

	const { setLoginState } = useContext(AuthContext);

	const data = { username: user, password: pass };

	const loginUser = () => {
    userData.loginUser(data)
    .then((res) => { 
				if (res.data.token) {
          alert('Successful login, please click OK to enter the temple of knowledge')
          setLoginState(true, res.data.token);
          history.push('/books')
				} else {
          throw new Error (res.data.message)
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
