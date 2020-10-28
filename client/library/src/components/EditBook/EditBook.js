import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EditBook = (props) => {
	const { editBook, title, description, author, image, role } = props;

	const [isEditMode, setEditMode] = useState(false);

	const [newTitle, setNewTitle] = useState(title);
	useEffect(() => setNewTitle(title), [title]);

	const [newAuthor, setNewAuthor] = useState(author);
	useEffect(() => setNewAuthor(author), [author]);

	const [newDescription, setNewDescription] = useState(description);
	useEffect(() => setNewDescription(description), [description]);

	const [newImage, setNewImage] = useState(image);
	useEffect(() => setNewImage(image), [image]);

	const edit = (e) => {
		e.preventDefault();
		setEditMode((prev) => !prev);
		editBook({
			title: newTitle,
			author: newAuthor,
			description: newDescription,
			image: newImage || undefined,
		});
	};

	const editMode = isEditMode ? (
		<>
			<input
				type='text'
				value={newTitle}
				onChange={(e) => setNewTitle(e.target.value)}
			/>
			<input
				type='text'
				value={newAuthor}
				onChange={(e) => setNewAuthor(e.target.value)}
			/>
			<input
				type='text'
				value={newDescription}
				onChange={(e) => setNewDescription(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Add new image link...'
				value={newImage}
				onChange={(e) => setNewImage(e.target.value)}
			/>
			<button onClick={edit}>Save Book Info</button>
			<button onClick={() => setEditMode((prev) => !prev)}>Cancel</button>
		</>
	) : (
		<>
			<h2>{title}</h2>
			<p>{author}</p>
			<p>{description}</p>
			{role === 'admin' && (
				<button onClick={() => setEditMode((prev) => !prev)}>
					Edit Book Info
				</button>
			)}
		</>
	);

	return editMode;
};

export default EditBook;

EditBook.propTypes = {
	editBook: PropTypes.func,
	title: PropTypes.string,
	description: PropTypes.string,
	author: PropTypes.string,
	image: PropTypes.string,
	role: PropTypes.string,
};
