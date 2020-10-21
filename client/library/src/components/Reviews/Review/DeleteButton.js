import React, { useEffect } from 'react';

const DeleteButton = (props) => {
	const { id, deleteFunction } = props;

	const actualDelete = () => deleteFunction(id);

	const deleteButton = (
		<button className='delete-review-button' onClick={actualDelete}>
			Delete
		</button>
	);

	return <>{deleteButton}</>;
};

export default DeleteButton;
