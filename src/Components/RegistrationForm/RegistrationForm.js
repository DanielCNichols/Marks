import React, { useState } from 'react';
import {
  useRegistrationForm,
  validationRules,
} from '../../Hooks/useRegistrationForm';
import AuthApiService from '../../Services/authService';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.css';
import '../../App.css';

export default function RegistrationForm(props) {
  const [error, setError] = useState(null);
  const {
    inputs,
    handleChange,
    handleSubmit,
    inputErrors,
  } = useRegistrationForm(handleRegister, validationRules);

  async function handleRegister(inputs) {
    try {
      await AuthApiService.postUser(inputs);
      props.history.push('/login');
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form className={s.registrationForm} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Sign Up</legend>
        <div className={s.formElement}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={handleChange}
            value={inputs.username}
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={handleChange}
            value={inputs.password}
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor='confirmPass'>Confirm Password</label>
          <input
            type='text'
            name='confirmPass'
            id='confirmPass'
            onChange={handleChange}
            value={inputs.confirmPass}
          />
        </div>

        {inputErrors && (
          <>
            {Object.keys(inputErrors).map((e, idx) => {
              return (
                <p style={{ color: 'white' }} key={idx}>
                  {inputErrors[e]}
                </p>
              );
            })}
          </>
        )}

        {error && (
          <>
            {Object.keys(error).map((e, idx) => {
              return (
                <p style={{ color: 'white' }} key={idx}>
                  {error[e]}
                </p>
              );
            })}
          </>
        )}

        {error && <p className='error'>{error}</p>}

        <button className={s.submit} type='submit'>
          Sign up
        </button>
      </fieldset>

      <p>
        Already have an account? <Link to='/login'>Log in!</Link>
      </p>
    </form>
  );
}
