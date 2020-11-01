import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';
import userData from './../../data/userData.js';
import { useHistory } from 'react-router-dom';
import SearchBook from '../SearchBook/SearchBook.js';
import { toastSuccess, toastError } from './../../common/toaster';
import { tokenData } from '../../common/common.js';

const Header = () => {
	const style = {
		display: 'inline-block',
		textDecoration: 'none',
		color: 'black',
	};
	const { isLoggedIn, setLoginState } = useContext(AuthContext);

	const tokenPayoad = tokenData();
	// const role = tokenPayoad.role;

	let history = useHistory();

	const logout = () => {
		userData
			.logoutUser()
			.then((res) => {
				toastSuccess(res.data.message);
				setLoginState(false);
				history.push('/landing');
			})
			.catch((err) => toastError(err));
	};

	// check if admin
	// const manageUsers = role === 'admin' && (
	// 	<NavLink to='/users' className='books-header'>
	// 		Admin
	// 	</NavLink>
	// );

	const header_option = !isLoggedIn ? (
  <div className='unauth'>
    <NavLink to='/landing' style={style}>
      <h1>Library</h1>
    </NavLink>
    <div className='auth-buttons'>
      <NavLink to='/register'>
        <button className='register'>Register</button>
      </NavLink>
      <NavLink to='/login'>
        <button className='login'>Login</button>
      </NavLink>
    </div>
  </div>
	) : (
  <div className='auth'>
    <NavLink to='/books' style={style}>
      <h1>Library</h1>
    </NavLink>
    <div className='search'>
      <SearchBook />
    </div>
    <div className='auth-header-links'>
      <NavLink to='/books' className='books-header'>
        Books
      </NavLink>
      <NavLink to='/user' className='user-header'>
        Profile
      </NavLink>
      <button className='logout' onClick={logout}>
        Logout
      </button>
    </div>
  </div>
	);

	return <header className='header'>{header_option}</header>;
};

export default Header;
