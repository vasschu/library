/* eslint-disable react/prop-types */
import React from 'react';
import {NavLink} from 'react-router-dom';
import BorrowButton from './BorrowButton'
import './Book.css'

const Book = ({book}) => {

    const {id, image, title, author, borrowed} = book;
    
return (
  <div className="book">
    <img src={image} alt="book-cover" />
    <div className="book-info">
      <h2>{title}</h2>
      <p className="author">{author}</p>
      <NavLink to={'/books/'+ id}><button className="book-details-btn">View Details</button></NavLink>
      <br />
      <BorrowButton borrowed={borrowed} />
    </div>
  </div>
    )
}

export default Book;
