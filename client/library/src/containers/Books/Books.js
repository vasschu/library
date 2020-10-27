import React, { useEffect, useState, useContext } from 'react'
import Book from '../../components/Book/Book'
import AddBook from '../../components/AddBook/AddBook'
import { tokenData } from '../../common/common.js'
import './Books.css'
import { BooksContext } from '../../context/BooksContext'

const Books = () => {
  const { books, book, getAllBooks, addBook } = useContext(BooksContext);
  // console.log(tokenData)
    useEffect(() => {
      getAllBooks()
    }, [book])


    const createBook = (data) => {
      addBook(data);
    };

const isAdmin = tokenData.role === 'admin' && <AddBook book={(data) => createBook(data)} />

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
