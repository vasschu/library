import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const style = {display: "inline-block", textDecoration: "none", color: "black"}
    return (
      <header className="header">
        <NavLink to="/landing" style={style}><h1>Library</h1></NavLink>
        <div className="auth-buttons">
          <NavLink to="/register"><button className="register">Register</button></NavLink>          
          <NavLink to="/login"><button className="login">Login</button></NavLink>          
        </div>
      </header>
    )
}

export default Header;
