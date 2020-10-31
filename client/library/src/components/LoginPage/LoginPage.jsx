import React, { useContext, useState, Fragment } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import userData from './../../data/userData'
import {toastSuccess, toastError} from './../../common/toaster'

const LoginPage = () => {

  let history = useHistory();

  const { setLoginState } = useContext(AuthContext);
  
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


	const loginUser = (ev) => {
    ev.preventDefault()

    const loginData = Object.values(form).reduce((data, input) => {
      return { ...data, [input.name]: input.value };
    }, {});

    userData.loginUser(loginData)
    .then((res) => { 
				if (res.data.token) {
          toastSuccess('Successful login.')
          setLoginState(true, res.data.token);
          history.push('/books')}})
    .catch((err) => toastError(err.response.data.message));
	};  

	return (
  <div className='login-page-layout'>
    <div className='call-to-action'>
      <h1 className='call-to-action-text'>
        Login to get access to the world's greatest stories
      </h1>
      <form className="login-form" onSubmit={loginUser}>
        {formView}
        <br />
        <button type="submit">Login</button>
      </form>
      
    </div>
  </div>
	);
};

export default LoginPage;
