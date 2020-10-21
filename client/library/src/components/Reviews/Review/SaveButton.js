import React, { useEffect } from 'react';

const SaveButton = (props) => {
	const { title, body, userId, bookId } = props;

	const data = {
		title: title,
		content: body,
		users_id: userId,
		books_id: bookId,
	};

	const useReview = () => {
		useEffect(() => {
			fetch(`localhost:5500/books/${bookId}/reviews`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}, []);
	};

	const saveButton = (
		<button className='save-review-button' onClick={useReview}>
			Save
		</button>
	);

	return <>{saveButton}</>;
};

export default SaveButton;
