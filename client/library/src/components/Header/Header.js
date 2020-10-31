import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';
import userData from './../../data/userData.js';
import { useHistory } from 'react-router-dom';
import { toastSuccess, toastError } from './../../common/toaster';

const Header = () => {
	const style = {
		display: 'inline-block',
		textDecoration: 'none',
		color: 'black',
	};
	const { isLoggedIn, setLoginState } = useContext(AuthContext);

	let history = useHistory();

	const logout = () => {
		userData
			.logoutUser()
			.then((res) => {
				console.log(res);
				toastSuccess(res.data.message);
				setLoginState(false);
				history.push('/landing');
			})
			.catch((err) => toastError(err));
	};

	// this should check if user is authenticated - but we need to make auth first :)
	// use 'auth' === 'auth' on line 10 for auth test version
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
				<input type='text' placeholder='Search a book...' />
				<button>Search</button>
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
