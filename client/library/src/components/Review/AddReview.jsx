import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {tokenData} from '../../common/common.js'
import userData from '../../data/reviewsData'
import {toastSuccess } from '../../common/toaster'
import { handleError } from '../../common/handleErrors.js';
import { Form, FormGroup, Input } from 'reactstrap';


const AddReview = (props) => {
	const { bookId, addReviewToggle, reviews, setReview } = props;

  const tokenPayload = tokenData()

  const initialForm = {
    title: {
      value: '',
      name: 'title',
      type: 'text',
      placeholder: 'Title...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 20,
      }
    },
    content: {
      value: '',
      name: 'content',
      type: 'text',
      placeholder: 'Review...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 255,
      }
    }
  }

  const [form, setForm] = useState(initialForm);

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
  
	const formView = Object.values(form).map((input) => {
    return (
      <FormGroup key={input.name}>
        <Input
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
        <br />
      </FormGroup>
		);
	});


	const addReview = (ev) => {
    ev.preventDefault()

    const newReviewData = {
      title: form.title.value,
      content: form.content.value,
      users_id: tokenPayload.sub
    }

	userData.addReview(bookId, newReviewData)
      .then(res => {
        const newReview = {
          content: res.data.content,
          id: res.data.id,
          title: res.data.title,
          username: res.data.username,
        }
        const reviewsCopy = [...reviews, newReview]

        setReview(reviewsCopy)
        {addReviewToggle(false)}
        toastSuccess('Review Added')
    })
    .catch(handleError)	
  }

	return (
  <div className='add-review'>
    <hr />
    <Form className="add-review-form" onSubmit={addReview}>
      {formView}
      <br />
      <button type="submit">Save</button>
    </Form>
    <button className='cancel-review-button' onClick={() => addReviewToggle(false)}>
      Close
    </button>
  </div>
	);
};

AddReview.propTypes = {
	bookId: PropTypes.string,
  addReviewToggle: PropTypes.func,
	reviews: PropTypes.array,
	setReview: PropTypes.func,
	  };

export default AddReview;
