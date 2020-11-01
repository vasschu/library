import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Rate.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
          <Form className="rate-book">
            <Label htmlFor="rating">Select rating:</Label>
            <Input type="select" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="-">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Input>
            <br />
            <button className="rate-book-btn" onClick={sendToParent}>Rate</button>
            <button className="rate-book-btn" onClick={setOpposite}>Cancel</button>
          </Form>
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
