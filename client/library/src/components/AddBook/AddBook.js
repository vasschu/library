import React, { Fragment, useState } from 'react';
import './AddBook.css';
import PropTypes from 'prop-types';

const AddBook = ({addBook}) => {
  const [isHidden, changeVisibility] = useState(true);
  
  const setOpposite = (e) => {
    e.preventDefault();
    changeVisibility(prev => !prev);
    setForm(initialValue);
  }
  
  const initialValue = {
    title: {
      value: '',
      name: 'title',
      type: 'text',
      placeholder: 'Title...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 255,
      }
    },
    author: {
      value: '',
      name: 'author',
      type: 'text',
      placeholder: 'Author...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 255,
      }
    },
    description: {
      value: '',
      name: 'description',
      type: 'text',
      placeholder: 'Description...',
      valid: true,
      validators: {
        required: true,
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

  const sendToParent = (ev) => {
    ev.preventDefault();

    const userData = Object.values(form).reduce((data, input) => {
      return { ...data, [input.name]: input.value };
    }, {});

    addBook(userData);
    setForm(initialValue);
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

  const createFormVisibility = isHidden ? (
    <button onClick={setOpposite}>Add Book</button>
    ) : (
      <>
        <h2>Book Info:</h2>
        <form className="create-book-form" onSubmit={sendToParent}>
          {inputForm}
          <br />
          <button type="submit">Add Book</button>
          <button onClick={setOpposite}>Cancel</button>
        </form>
      </>
    )
    
    return (
      <div>
        {createFormVisibility}
      </div>
    )
}

export default AddBook;

AddBook.propTypes = {
  addBook: PropTypes.func,
}
