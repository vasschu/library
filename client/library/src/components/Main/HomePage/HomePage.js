/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom'
import './HomePage.css';

const HomePage = ({book}) => {
    const {image} = book;
    return (
        // visualize book
      <div className='home-page-layout'>
        <img src={image} alt="alternatetext" />
        <div className="call-to-action">
          <h1 className="call-to-action-text">Get access to the world's greatest
            stories<br />with Library.
          </h1>
          <NavLink to="/register"><button className="call-to-action-button">Join us today</button></NavLink>          
        </div>
      </div>
    )
}

export default HomePage;
