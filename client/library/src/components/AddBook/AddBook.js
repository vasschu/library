import React, { useState } from 'react';
import './AddBook.css'
import PropTypes from 'prop-types';

const AddBook = ({book}) => {
  
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ description, setDescr ] = useState('');
  const [ image, setImage ] = useState('');
  
  const [isHidden, changeVisibility] = useState(true);
  
  const setOpposite = (e) => {
    e.preventDefault();
    changeVisibility(prev => !prev)
  }

  const sendToParent = (e) => {
    e.preventDefault();

    book({
      title,
      author,
      description,
      image
    });

    setTitle('');
    setAuthor('');
    setDescr('');
    setImage('');
  }

  const createFormVisibility = isHidden ? (
    <button onClick={setOpposite}>Add Book</button>
    ) : (
      <>
        <h2>Book Info:</h2>
        <form className="create-book-form">
          <input type="text" value={title} placeholder="Title..." onChange={e => setTitle(e.target.value)} />
          <input type="text" value={author} placeholder="Author..." onChange={e => setAuthor(e.target.value)} />
          <input type="text" value={description} placeholder="Description..." onChange={e => setDescr(e.target.value)} />
          <input type="text" value={image} placeholder="Image link..." onChange={e => setImage(e.target.value)} />
          <br />
          <button onClick={sendToParent}>Add Book</button>
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
  book: PropTypes.func,
}
