import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {BooksContext} from '../../context/BooksContext.js';

const SearchBook = () => {
    const { searchBook } = useContext(BooksContext);
    const [ searchTerm, setSearhTerm ] = useState('');
    const [ isValid, setIsValid ] = useState(true);
    const history = useHistory();

    const handleChange = (ev) => {
        ev.preventDefault();
        const value = ev.target.value;

        if (!value || value.length < 4 || value.length > 50) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        setSearhTerm(value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        searchBook(searchTerm);
        history.push({
            path: '/books',
            search: `?search=${searchTerm}`
        })
        setSearhTerm('')
    }

    const style = isValid ? {border: '1px solid grey'} : {border: '1px solid red'}

    return (
      <form onSubmit={handleSubmit}>
        <input type='text' style={style} placeholder="Search a book..." value={searchTerm} onChange={handleChange} />
        <button type='submit'>Search</button>
      </form>
    )

}

export default SearchBook;
