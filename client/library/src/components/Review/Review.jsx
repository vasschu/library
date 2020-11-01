import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReviewLikes from './ReviewLikes';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const Review = (props) => {
  const {title, content, username, id } = props.review
  const {bookId, deleteReview, updateStateUpdate, userToken, role, userId } = props
  
const [updateMode, setModeUpdate] = useState(false);


const canEdit = (role === 'admin' || userToken === username) && (
  <div>
    <button className='delete-review-button' onClick={() => deleteReview(bookId, id)}>
      Delete
    </button>
    <button className='edit-review-button' onClick={() => setModeUpdate(true)}>Edit</button>
  </div>)

const initialForm = {
  title: {
    value: title,
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
    value: content,
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
      <Label htmlFor={input.name}>{input.name}</Label>
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


const saveEdit = (ev) => {
  ev.preventDefault()

  const editedData = {
    title: form.title.value,
    content: form.content.value,
  }
  updateStateUpdate(bookId, id, editedData);
  setModeUpdate(false)
};

	return (
  <Card className='review'>
    {updateMode ? (
      <>
        <Form className="add-review-form" onSubmit={saveEdit}>
          {formView}
          <br />
          <button type="submit">Save</button>
        </Form>
        <button className='close-edit-review-button' onClick={() => setModeUpdate(false)}>Cancel</button>
      </>
      ) : ( 
        <>
          <hr />
          <CardBody>
            <h5>{title}</h5>
            <hr />
            <p>{content}</p>
            <p>From: {username}</p>
            {canEdit}
            <ReviewLikes reviewId={id} userId={userId} />
          </CardBody>
          <hr />
        </>
    )}

  </Card>
  
	);
};

Review.propTypes = {
review: PropTypes.object,
bookId: PropTypes.string,
userToken: PropTypes.string,
role: PropTypes.string,
deleteReview: PropTypes.func,
updateStateUpdate: PropTypes.func,
userId: PropTypes.number
  };


export default Review;
