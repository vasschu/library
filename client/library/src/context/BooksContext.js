
import React, { createContext, useState } from 'react';
import BooksService from '../data/booksData.js'

const initialState = []

export const BooksContext = createContext(initialState);

export const BooksProvider = ({children}) => {
    const [ books, setBooks ] = useState([]);
    const [ book, setBook ] = useState({});
    const [ rate, setRate ] = useState('')
    
    const getAllBooks = () => {
        BooksService.getBooks()
        .then((resBooks) => setBooks(resBooks.data))
        .catch(err => {
            if (err.response) {
              // client received an error response (5xx, 4xx)
              alert(err.response.data)
            } else if (err.request) {
              // client never received a response, or request never left
              console.log(err.request)
            } else {
              // anything else
              console.log(err)
            }})
    }

    const addBook = (book) => {
        console.log(book)
        BooksService.create(book)
        .then(res => console.log(res))
        .catch(err => {
            if (err.response) {
              alert(err.response.data.Message)
            } else if (err.request) {
              console.log(err.request)
            } else {
              console.log(err)
            }})
    }

    const removeBook = (id) => {
        BooksService.deleteBook(id)
        .then(resBook => setBook(resBook.data))
    }

    const updateBook = (id, info) => {
        BooksService.editBook(id, info)
        .then(resBook => setBook(resBook.data))

    }

    const retrieveIndividualBook = (id) => {
        BooksService.getBookById(id)
        .then(resBook => setBook(resBook.data))
    }

    const borrowBook = (id) => {
        BooksService.borrowBook(id)
        .then(resBook => setBook(resBook.data))
    }

    const returnBook = (id) => {
        BooksService.returnBook(id)
        .then(resBook => setBook(resBook.data.res))
    }

    const getBookRating = (id) => {
        BooksService.getBookRating(id)
        .then(bookRate => setRate(bookRate.data))
    }

    // const rateBook = (id, rating) => {

    // }

    return (
      <BooksContext.Provider value={{
            books,
            book,
            rate,
            getAllBooks, 
            addBook, 
            removeBook,
            updateBook,
            retrieveIndividualBook,
            borrowBook,
            returnBook,
            getBookRating      
      }}
      >
        {children}
      </BooksContext.Provider>
        )
}
