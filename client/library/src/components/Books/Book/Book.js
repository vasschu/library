/* eslint-disable react/prop-types */
import React from 'react';
import {NavLink} from 'react-router-dom';
import './Book.css'

const Book = ({book}) => {
    const {id, image, title, author} = book;
return (
  <div className="book">
    <img src={image} />
    <div className="book-info">
      <h2>{title}</h2>
      <p>{author}</p>
      <NavLink to={'/books/'+ book.id}><button className="book-details-btn">View Details</button></NavLink>
      <br />
      <button>Borrow</button>
    </div>
  </div>
    )
}

export default Book;
