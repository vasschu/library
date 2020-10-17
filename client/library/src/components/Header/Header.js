import React from 'react'
import { NavLink, Switch } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const style = {display: "inline-block", textDecoration: "none", color: "black"}

    // this should check if user is authenticated - but we need to make auth first :)
    // use 'auth' === 'auth' on line 10 for auth test version
    const header_option = 'auth' === 'auh' ? (
      <div className="unauth">
        <NavLink to="/landing" style={style}><h1>Library</h1></NavLink>
        <div className="auth-buttons">
          <NavLink to="/register"><button className="register">Register</button></NavLink>          
          <NavLink to="/login"><button className="login">Login</button></NavLink>          
        </div>
      </div>
    ) : (
      <div className="auth">
        <NavLink to="/books" style={style}><h1>Library</h1></NavLink>
        <div className="search">
          <input type='text' />
          <button>Search</button>
        </div>
        <div className="auth-header-links">
          <NavLink to="/books" className="books-header">Books</NavLink>
          <NavLink to="/user" className="user-header">Profile</NavLink>
        </div>
      </div>
    )

    return (
      <header className="header">
        {header_option}
      </header>
    )
}

export default Header;
