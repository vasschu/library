import React, { useEffect, useState, useContext } from 'react'
import Book from './Book/Book'
import AddBook from './AddBook/AddBook'
import { tokenData } from '../../common/common.js'
import './Books.css'
import BooksService from '../../data/booksData.js'

const Books = () => {
  // console.log(tokenData)
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [newBook, setNewBook] = useState()
  // console.log(books)
    
    useEffect(() => {
      BooksService.getBooks()
      .then(book => setBooks(book.data))
      .catch(err => setError(err))
    }, [])


    const book = (data) => {
      if (data) { 
        setNewBook(data)
      }
    };

    useEffect(() => {
      if (!newBook){
        return;
      }
      BooksService.create(newBook)
      .then(book => console.log(book))
      .catch(err => setError(err))
  }, [newBook])


const isAdmin = tokenData.role === 'admin' && <AddBook book={book} />

return (
  <>
    {isAdmin}
    <div className="books">
      {books.map((book) => {
      return (
        <Book key={book.id} book={book} />
    )})}
    </div>
  </>)
}

export default Books;
