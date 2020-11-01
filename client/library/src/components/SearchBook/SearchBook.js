import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {SearchBooksContext} from '../../context/SearchBookContext.js';

const SearchBook = () => {
    const { searchBook } = useContext(SearchBooksContext);
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
            pathname: '/books',
            search: `?search=${searchTerm}`
        })
        setSearhTerm('')
    }

    const inputStyle = isValid ? {border: '1px solid grey'} : {border: '1px solid red'}

    return (
      <form onSubmit={handleSubmit}>
        <input type='text' style={inputStyle} placeholder="Search a book..." value={searchTerm} onChange={handleChange} />
        {isValid ? <button type='submit'>Search</button> : <button style={{ cursor: 'not-allowed' }}>Search</button>}
      </form>
    )

}

export default SearchBook;
