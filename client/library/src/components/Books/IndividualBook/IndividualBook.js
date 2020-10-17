import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BorrowButton from '../Book/BorrowButton';

const IndividualBook = (props) => {
    const { id } = props.match.params;

    const [book, setBook] = useState('');
    const [rated, setRating] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5500/books/${id}`)
        .then(res => res.json())
        .then(book => setBook(book))
        .catch(err => setError(err))
    }, [id])

    const {image, title, author, borrowed, description} = book;
    
    useEffect(() => {
        fetch(`http://localhost:5500/books/${id}/rate`)
        .then((res) => res.json())
        .then((rate) => setRating(rate))
        .catch(err => setError(err))
    }, [id])
    
    const {rating} = rated;
    const fixedRating = !rating ? rating : rating.toFixed();

    return (
        //book info
        //reviews
      <div className="book">
        <img src={image} alt="book-cover" />
        <div className="book-info">
          <h3>{title}</h3>
          <p>{author}</p>
          <p>Rating: {fixedRating}/5</p>
          <p>{description}</p>
          <BorrowButton borrowed={borrowed} />
          <NavLink to={'/books/'+id+'/reviews'}><button>Add a review</button></NavLink>
        </div>
      </div>
    )


}

export default IndividualBook;
