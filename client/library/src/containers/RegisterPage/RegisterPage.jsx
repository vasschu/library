import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import userData from '../../data/userData';
import {toastSuccess, toastError} from '../../common/toaster'


const RegisterPage = () => {

  let history = useHistory();
  const initialForm = {
    username: {
      value: '',
      name: 'username',
      type: 'text',
      placeholder: 'Username...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 20,
      }
    },
    password: {
      value: '',
      name: 'password',
      type: 'password',
      placeholder: 'Password...',
      valid: true,
      validators: {
        required: true,
        minLength: 1,
        maxLength: 20,
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
        <br />
      </Fragment>
		);
	});


	const registerUser = (ev) => {
    ev.preventDefault()

    const registerData = Object.values(form).reduce((data, input) => {
      return { ...data, [input.name]: input.value };
    }, {});

    userData.registerUser(registerData)
			.then((res) => {
        if(res.data.user) {
          toastSuccess(`${res.data.message} You are redirected to login`)
          history.push('/login')
        } else {
          throw new Error (res.data.message)
        }
			})
      .catch((err) => toastError(err.response.data.message))
	};

	return (
  <div>
    <h1 className='call-to-action-text'>
      Don't be stupid. Register now.
    </h1>
    <form className="register-form" onSubmit={registerUser}>
      {formView}
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
	);
};

export default RegisterPage;
