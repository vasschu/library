import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BooksContext } from '../../context/BooksContext';

const SearchBook = () => {
    const { searchBook } = useContext(BooksContext);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ isValid, setIsValid] = useState(true)

    const history = useHistory()

    const handleChange = (ev) => {
        ev.preventDefault();
        const value = ev.target.value;
        if (!value || value.length < 3 || value.length > 50) {
            setIsValid(prev => !prev)
        }

        setSearchTerm(value);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        searchBook(searchTerm);
        history.push({
            pathname: '/books',
            search: `?search=${searchTerm}`
        })
        setSearchTerm('')
    }

    const style = isValid ? {border: '1px solid grey'} : {border: '1px solid red'}
    return (
      <form className="searchBook" onSubmit={handleSubmit}>
        <input type='text' style={style} placeholder='Search a book...' value={searchTerm} onChange={handleChange} />
        <button type='submit'>Search</button>    
      </form>
    )
}

export default SearchBook;
