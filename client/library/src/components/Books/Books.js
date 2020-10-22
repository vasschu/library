import React, { useEffect, useState } from 'react'
import Book from './Book/Book'
import AddBook from './AddBook/AddBook'
import './Books.css'

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [newBook, setNewBook] = useState()

    
    useEffect(() => {
        fetch(`http://localhost:5500/books`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJ1c2VybmFtZSI6InZlcmppIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzMzg3NTk4LCJleHAiOjE2MTYzNDc1OTh9.vWq90kIkz2r89Y5UqF-rcUutWXdft_aZqO25Y27YYMQ',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(book => setBooks(book))
        .catch(err => setError(err))
    }, []);

    const book = (data) => {
      if (data) { 
        setNewBook(data)
      }
    };

    useEffect(() => {
      if (newBook) {
        fetch(`http://localhost:5500/books/`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJ1c2VybmFtZSI6InZlcmppIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzMzg3NTk4LCJleHAiOjE2MTYzNDc1OTh9.vWq90kIkz2r89Y5UqF-rcUutWXdft_aZqO25Y27YYMQ',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newBook),
      })
      .then(res => res.json())
      .then(resp => console.log(resp))
      .catch(err => setError(err))
    }
  }, [newBook])



  // console.log(res);

// we'll add check if role === 'admin' and use the result here insted of 'true. We need auth first.
const isAdmin = true && <AddBook book={book} />

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
