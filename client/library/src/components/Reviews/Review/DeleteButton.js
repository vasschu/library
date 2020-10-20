import React, {useEffect} from 'react';

const DeleteButton = (id) => {

	const deleteReview = () => {
		console.log('DeleteData');
	};

	const deleteButton = (
  <button className='delete-review-button' onClick={deleteReview}>
    Delete
  </button>
	);

	
	

	return <>{deleteButton}</>;
};

export default DeleteButton;
