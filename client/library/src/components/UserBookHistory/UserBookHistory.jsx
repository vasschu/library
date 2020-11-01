/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';



const UserBookHistory = (props) => {
const {data} = props


if(data.return_date){
	data.borrowStatus = "Returned"
} else {
	data.borrowStatus = "Borrowed"
	data.return_date = "n/a"
}
	
	return (
  <div className='Borrowed book'>
    <div><Link to={`/books/${data.books_id}`}>{`Book: ${data.title}`}</Link></div>
    <br />
    <div>{`Status: ${data.borrowStatus}`}</div>
    <br />
    <div>{`Borrowed on: ${data.borrow_date}`}</div>
    <br />
    <div>{`Returned on: ${data.return_date}`}</div>
    <hr />
  </div>
	);
};

export default UserBookHistory;
