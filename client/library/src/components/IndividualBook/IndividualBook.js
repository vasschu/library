/* eslint-disable react/prop-types */
import React, {useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddReview from '../Reviews/Review/AddReview';
import BorrowButton from '../Books/Book/BorrowButton';
import Reviews from '../Reviews/Reviews';
import EditBook from './EditBook/EditBook';

const IndividualBook = (props) => {
	const { id } = props.match.params;
	const token = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJ1c2VybmFtZSI6InZlcmppIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzMzg3NTk4LCJleHAiOjE2MTYzNDc1OTh9.vWq90kIkz2r89Y5UqF-rcUutWXdft_aZqO25Y27YYMQ'

	const [book, setBook] = useState('');
	const [rated, setRating] = useState('');
	const [error, setError] = useState(null);
	const [updatedBook, setUpdatedBook] = useState('')

	useEffect(() => {
		fetch(`http://localhost:5500/books/${id}`, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer' + token,
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((book) => setBook(book))
			.catch((err) => setError(err));
	}, [id]);

	const { image, title, author, borrowed, description, borrow_user } = book;

	useEffect(() => {
		fetch(`http://localhost:5500/books/${id}/rate`, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer' + token,
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((rate) => setRating(rate))
			.catch((err) => setError(err));
	}, [id]);

	
	const del = (id) => {
		  fetch(`http://localhost:5500/books/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer' + token,
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(resp => console.log(resp))
		.catch(err => setError(err))
	}

	const borrowBook = (id) => {
		fetch(`http://localhost:5500/books/${id}`, {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'Authorization': 'Bearer' + token,
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => setBook(data))
	}

	const returnBook = (id) => {
		fetch(`http://localhost:5500/books/${id}`, {
			method: 'PATCH',
			headers: {
				'Authorization': 'Bearer' + token,
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => setBook(data.res))
	}

	const editBook = (data) => {
		if (data) { 
		  setUpdatedBook(data)
		}
	  };
  
	  useEffect(() => {
		if (updatedBook) {
		  fetch(`http://localhost:5500/books/${id}`, {
			method: 'PUT',
			headers: {
			  'Authorization': 'Bearer' + token,
			  'Accept': 'application/json, text/plain, */*',
			  'Content-Type': 'application/json'
			},
		  body: JSON.stringify(updatedBook),
		})
		.then(res => res.json())
		.then(data => setBook(data))
		.catch(err => setError(err))
	  }
	}, [updatedBook])

	const parseJwt = (token) => {
		if (!token) { return; }
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	
	const { sub: logedUser } = parseJwt(token);

	const { rating } = rated;
	const fixedRating = !rating ? rating : rating.toFixed();

	

	// check if admin
	const adminDelete = true && 
	(<NavLink to='/books'>
  		<button onClick={() => del(id)}>Delete Book</button>
		</NavLink>);

	return (
		//book info
		//reviews
  <div className='book'>
    <img src={image} alt='book-cover' />
    <div className='book-info'>
      <EditBook title={title} description={description} author={author} fixedRating={fixedRating} editBook={editBook} />
      {adminDelete}
      <br />
      <BorrowButton
        borrowed={borrowed} 
        borrowBook={() => borrowBook(id)} borrowUser={borrow_user} 
        logedUser={logedUser} returnBook={() => returnBook(id)}
      />
      <NavLink to={'/books/' + id + '/reviews'}>
        <button>Add a review</button>
      </NavLink>
      <AddReview bookId={id} />
    </div>
    <Reviews id={id} />
  </div>
	);
};

export default IndividualBook;
