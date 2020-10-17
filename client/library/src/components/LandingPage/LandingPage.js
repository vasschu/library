/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom'
import './LandingPage.css';

const LandingPage = () => {
  const [book, setBook] = useState('')
  const [error, setError] = useState(null);
  
  useEffect(() => {
      // const res = await fetch('localhost:5500/books/4');
      // const book = await res.json()
      // setBook(book);

      fetch('http://localhost:5500/books/4')
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(error => setError(error.message))
  }, [])

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

export default LandingPage;
