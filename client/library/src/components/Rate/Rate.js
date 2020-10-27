import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Rate.css';

const Rate = ({ rate }) => {

    const [isHidden, changeVisibility] = useState(true);
    const [ rating, setRating ] = useState('')

    const setOpposite = (e) => {
      e.preventDefault();
      changeVisibility(prev => !prev)
    }
  
    const sendToParent = (e) => {
      e.preventDefault();

        rate({rating});
        changeVisibility(prev => !prev)
    }
  
    const createFormVisibility = isHidden ? (
      <button className="rate-book-btn" onClick={setOpposite}>Rate</button>
      ) : (
        <>
          <form className="rate-book">
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br />
            <button className="rate-book-btn" onClick={sendToParent}>Rate</button>
            <button className="rate-book-btn" onClick={setOpposite}>Cancel</button>
          </form>
        </>
      )
      
      return (
        <div>
          {createFormVisibility}
        </div>
      )
}

export default Rate;

Rate.propTypes = {
  rate: PropTypes.func,
};
