/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import BorrowButton from './BorrowButton'
import {BooksContext} from '../../Context/BooksContext'
import './Book.css'

const Book = ({book, tokenData}) => {

    const {id, image, title, author, borrowed, borrow_user } = book;
	const { borrowBook, returnBook } = useContext(BooksContext);

    console.log(tokenData)
return (
  <div className="book">
    <img src={image} alt="book-cover" />
    <div className="book-info">
      <h2>{title}</h2>
      <p className="author">{author}</p>
      <NavLink to={'/books/'+ id}><button className="book-details-btn">View Details</button></NavLink>
      <br />
      <BorrowButton
        borrowed={borrowed} logedUser={tokenData.sub} borrowUser={borrow_user} 
        borrowBook={() => borrowBook(id)} returnBook={() => returnBook(id)}
      />
    </div>
  </div>
    )
}

export default Book;
