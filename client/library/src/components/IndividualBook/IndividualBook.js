/* eslint-disable react/prop-types */
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../Reviews/Review/AddReview';
import BorrowButton from '../Books/Book/BorrowButton';
import Reviews from '../Reviews/Reviews';

const IndividualBook = (props) => {
	const { id } = props.match.params;

	const [book, setBook] = useState('');
	const [rated, setRating] = useState('');
	const [error, setError] = useState(null);
	const [isEditMode, setEditMode] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:5500/books/${id}`)
			.then((res) => res.json())
			.then((book) => setBook(book))
			.catch((err) => setError(err));
	}, [id]);

	const { image, title, author, borrowed, description } = book;

	useEffect(() => {
		fetch(`http://localhost:5500/books/${id}/rate`)
			.then((res) => res.json())
			.then((rate) => setRating(rate))
			.catch((err) => setError(err));
	}, [id]);

	
	const del = (id) => {
		  fetch(`http://localhost:5500/books/${id}`, {
		  method: 'DELETE',
		})
		.then(res => res.json())
		.then(resp => console.log(resp))
		.catch(err => setError(err))
	}

	const { rating } = rated;
	const fixedRating = !rating ? rating : rating.toFixed();

	const editMode = isEditMode ? (
  <> 
    <h2>{title}</h2>
    <p>{author}</p>
    <p>Rating: {fixedRating} / 5</p>
    <p>{description}</p>
    <button onClick={() => setEditMode(prev => !prev)}>Edit Book Info</button>
  </> ) : (
    <> 
      <h2>{title}</h2>
      <p>{author}</p>
      <p>Rating: {fixedRating} / 5</p>
      <p>{description}</p>
      {true && 
	(<>
  		<button onClick={() => setEditMode(prev => !prev)}>Edit Book Info</button>
		</>)}
    </>
	)

	// check if admin
	const adminDelete = true && 
	(<>
  		<button onClick={() => del(id)}>Delete Book</button>
		</>);

	return (
		//book info
		//reviews
  <div className='book'>
    <img src={image} alt='book-cover' />
    <div className='book-info'>
      {editMode}
      {adminDelete}
      <br />
      <BorrowButton borrowed={borrowed} />
      <NavLink to={'/books/' + id + '/reviews'}>
        <button>Add a review</button>
      </NavLink>
      {/* <AddReview bookId={id} /> */}
    </div>
    <Reviews id={id} />
  </div>
	);
};

export default IndividualBook;
