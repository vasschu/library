import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './Header.css';

const Header = () => {
	const style = {
		display: 'inline-block',
		textDecoration: 'none',
		color: 'black',
	};
	const { isLoggedIn, setLoginState } = useContext(AuthContext);

	// this should check if user is authenticated - but we need to make auth first :)
	// use 'auth' === 'auth' on line 10 for auth test version
  const header_option =
  (!isLoggedIn) ? (
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
        <button className='logout' onClick={() => setLoginState(false)}>Logout</button>
    </div>
  </div>
		);

	return <header className='header'>{header_option}</header>;
};

export default Header;
