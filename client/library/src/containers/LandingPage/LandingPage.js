/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
	const [book, setBook] = useState();

	useEffect(() => {
    const random = Math.ceil(Math.random() * 4);
    
    axios.get(`http://localhost:5500/landing/${random}`)
      .then((bookRes) => {
        setBook(bookRes.data);
      });
	}, []);

	return (
		// visualize book
  <div className='home-page-layout'>
    {book && <img src={book.image} alt='alternatetext' />}
    <div className='call-to-action'>
      <h1 className='call-to-action-text'>
        Get access to the world's greatest stories
        <br />
        with Library.
      </h1>
      <NavLink to='/register'>
        <button className='call-to-action-button'>Join us today</button>
      </NavLink>
    </div>
  </div>
	);
};

export default LandingPage;
