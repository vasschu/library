/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';

const EditBook = (props) => {
    const {editBook, title, description, author, image, fixedRating} = props; 

    const [isEditMode, setEditMode] = useState(false);

    const [newTitle, setNewTitle] = useState(title);
    useEffect(() => setNewTitle(title), [title])

    const [newAuthor, setNewAuthor] = useState(author);
    useEffect(() => setNewAuthor(author), [author])

    const [newDescription, setNewDescription] = useState(description);
    useEffect(() => setNewDescription(description), [description])
    
    const [newImage, setNewImage] = useState(image);
    useEffect(() => setNewImage(image), [image])

    const edit = (e) => {
        e.preventDefault();
        console.log(newDescription)
        setEditMode(prev => !prev);
        editBook({
            title: newTitle,
            author: newAuthor,
            description: newDescription,
            image: newImage || undefined,
        })
    }

    const editMode = isEditMode ? (
      <> 
        <input type='text' value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <input type='text' value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
        <p>Rating: {fixedRating} / 5</p>
        <input type='text' value={newDescription} onChange={e => setNewDescription(e.target.value)} />
        <input type='text' placeholder='Add new image link...' value={newImage} onChange={e => setNewImage(e.target.value)} />
        <button onClick={edit}>Save Book Info</button>
      </> ) : (
        <> 
          <h2>{title}</h2>
          <p>{author}</p>
          <p>Rating: {fixedRating} / 5</p>
          <p>{description}</p>
          {true && 
          (<>
            <button onClick={() => setEditMode(prev => !prev)}>Edit Book Info</button>
          </ >)}
        </>
          )

          return editMode;
}

export default EditBook;
