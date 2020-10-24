/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BooksContext } from '../../context/BooksContext'
import './LandingPage.css';

const LandingPage = () => {
const { book, retrieveIndividualBook } = useContext(BooksContext)
// const {image} = book;
console.log(book)  

  useEffect(() => {
      retrieveIndividualBook(1);
  }, [])

    return (
        // visualize book
      <div className='home-page-layout'>
        <img src='{image}' alt="alternatetext" />
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
