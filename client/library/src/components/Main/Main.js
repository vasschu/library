import React, { useEffect, useState } from 'react'
import HomePage from './HomePage/HomePage'

// add conditional - which component to show based on user auth

const Main = () => {
    const [book, setBook] = useState('')
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // const res = await fetch('localhost:5500/books/4');
        // const book = await res.json()
        // setBook(book);

        fetch('http://localhost:5500/books/4')
        .then(res => res.json())
        .then(data => setBook(data))
        .catch(error => setError(error.message))
    }, [])

    return <HomePage book={book} />
}

export default Main;
