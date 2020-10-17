import React, { useEffect, useState } from 'react'
import Book from './Book/Book'
import './Books.css'

// add conditional - which component to show based on user auth

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetch('http://localhost:5500/books')
        .then(res => res.json())
        .then(book => setBooks(book))
        .catch(err => setError(err))
    }, [])
    console.log(books)
    return (
      <div className="books">
        {books.map((book) => {
        return (
          <Book key={book.id} book={book} />
        )})}
      </div>)
}

export default Books;
