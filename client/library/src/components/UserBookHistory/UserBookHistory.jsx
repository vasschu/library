/* eslint-disable react/prop-types */
import React from 'react';


const UserBookHistory = (props) => {
const {data} = props

if(data.return_date){
	data.borrowStatus = "Returned"
} else {
	data.borrowStatus = "Borrowed"
	data.return_date = "n/a"
}

console.log(data);
	
	return (
  <div className='Borrowed book'>
    <div><a href={"http://localhost:3000/books/"+data.books_id}>{`Book: ${data.title}`}</a></div>
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
