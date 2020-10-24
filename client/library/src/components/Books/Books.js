import React, { useEffect, useState, useContext } from 'react'
import Book from './Book/Book'
import AddBook from './AddBook/AddBook'
import { tokenData } from '../../common/common.js'
import './Books.css'
import { BooksContext } from '../Context/BooksContext'

const Books = () => {
  // console.log(tokenData)
    // const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [newBook, setNewBook] = useState()
  // console.log(books)

  const { books, getAllBooks, addBook } = useContext(BooksContext);

    useEffect(() => {
      getAllBooks()
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
      addBook(newBook);
  }, [newBook])


const isAdmin = tokenData.role === 'admin' && <AddBook book={book} />

return (
  <>
    {isAdmin}
    <div className="books">
      {books.map((book) => {
      return (
        <Book key={book.id} book={book} tokenData={tokenData} />
    )})}
    </div>
  </>)
}

export default Books;
