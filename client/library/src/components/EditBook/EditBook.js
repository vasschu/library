import React, {Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../AddBook/AddBook.css'
const EditBook = (props) => {
  const { editBook, title, description, author, image, role } = props;

  const [isEditMode, setEditMode] = useState(false);
  
  const initialValue = {
    title: {
      value: title,
      name: 'title',
      type: 'text',
      placeholder: 'Title...',
      valid: true,
      validators: {
        required: false,
        minLength: 1,
        maxLength: 255,
      }
    },
    author: {
      value: author,
      name: 'author',
      type: 'text',
      placeholder: 'Author...',
      valid: true,
      validators: {
        required: false,
        minLength: 1,
        maxLength: 255,
      }
    },
    description: {
      value: description,
      name: 'description',
      type: 'text',
      placeholder: 'Description...',
      valid: true,
      validators: {
        required: false,
        minLength: 15,
        maxLength: 5000,
      }
    },
    image: {
      value: '',
      name: 'image',
      type: 'text',
      placeholder: 'Image...',
      valid: true,
      validators: {
        required: false,
        minLength: 1,
        maxLength: 255,
      }
    }
  }

  const [ form, setForm ] = useState(initialValue)
  useEffect(() => setForm(initialValue), [title, author, description, image])


  const onChange = (ev) => {
    const { name, value } = ev.target;

    const currentTarget = { ...form[name] };
    currentTarget.value = value;
    currentTarget.valid = true;

    if (currentTarget.validators.required) {
      currentTarget.valid = currentTarget.valid && currentTarget.value.length > 0;
    }

    if (currentTarget.validators.minLength) {
      currentTarget.valid = currentTarget.valid && currentTarget.value.length >= currentTarget.validators.minLength;
    }

    if (currentTarget.validators.maxLength) {
      currentTarget.valid = currentTarget.valid && currentTarget.value.length <= currentTarget.validators.maxLength;
    }

    if (!currentTarget.validators.required && !currentTarget.value.length) {
      currentTarget.valid = true;
    }

    setForm({ ...form, [name]: currentTarget });
  }

  const edit = (ev) => {
    ev.preventDefault();

    const bookData = Object.values(form).reduce((data, input) => {
      return { ...data, [input.name]: input.value };
    }, {});

		editBook(bookData);
    setEditMode((prev) => !prev);
    // setForm(initialValue);
  };

  const inputForm = Object.values(form).map(input => {
    return (
      <Fragment key={input.name}>
        <input
          style={
            input.valid
              ? { border: '1px solid grey' }
              : { border: '1px solid red' }
          }
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={onChange}
        />
      </Fragment>
    )
  })
	const editMode = isEditMode ? (
  <form className="create-book-form" onSubmit={edit}>
    {inputForm}
    <button type="submit">Save Book Info</button>
    <button onClick={() => setEditMode((prev) => !prev)}>Cancel</button>
  </form>
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

// const [newTitle, setNewTitle] = useState(title);
// 	useEffect(() => setNewTitle(title), [title]);

// 	const [newAuthor, setNewAuthor] = useState(author);
// 	useEffect(() => setNewAuthor(author), [author]);

// 	const [newDescription, setNewDescription] = useState(description);
// 	useEffect(() => setNewDescription(description), [description]);

// 	const [newImage, setNewImage] = useState(image);
// 	useEffect(() => setNewImage(image), [image]);

// 	const edit = (e) => {
// 		e.preventDefault();
// 		setEditMode((prev) => !prev);
// 		editBook({
// 			title: newTitle,
// 			author: newAuthor,
// 			description: newDescription,
// 			image: newImage || undefined,
// 		});
// 	};

// 	const editMode = isEditMode ? (
// 		<>
// 			<input
// 				type='text'
// 				value={newTitle}
// 				onChange={(e) => setNewTitle(e.target.value)}
// 			/>
// 			<input
// 				type='text'
// 				value={newAuthor}
// 				onChange={(e) => setNewAuthor(e.target.value)}
// 			/>
// 			<input
// 				type='text'
// 				value={newDescription}
// 				onChange={(e) => setNewDescription(e.target.value)}
// 			/>
// 			<input
// 				type='text'
// 				placeholder='Add new image link...'
// 				value={newImage}
// 				onChange={(e) => setNewImage(e.target.value)}
// 			/>
// 			<button onClick={edit}>Save Book Info</button>
// 			<button onClick={() => setEditMode((prev) => !prev)}>Cancel</button>
