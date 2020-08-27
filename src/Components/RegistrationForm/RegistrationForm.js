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
      console.log('running');
      await AuthApiService.postUser(inputs);
      props.history.push('/login');
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <form className={s.registrationForm} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Sign Up</legend>
        <div className={s.formElement}>
          <label htmlFor="username">Username</label>
          {inputErrors.username && (
            <p className={s.error}>{inputErrors.username}</p>
          )}
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={inputs.username}
            placeholder="markit146"
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor="password">Password</label>
          {inputErrors.password && (
            <p className={s.error}>{inputErrors.password}</p>
          )}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Pass123"
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor="confirmPass">Confirm Password</label>
          {inputErrors.confirmPass && (
            <p className={s.error}>{inputErrors.confirmPass}</p>
          )}
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            onChange={handleChange}
            value={inputs.confirmPass}
            placeholder="Pass123"
          />
        </div>

        {error && (
          <div className={s.postError}>
            {Object.keys(error).map((e, idx) => {
              return (
                <p className={s.error} key={idx}>
                  {error[e]}
                </p>
              );
            })}
          </div>
        )}

        <button className={s.submit} type="submit">
          Sign up
        </button>
      </fieldset>

      <p className={s.loginTag}>
        Already have an account? <Link to="/login">Log in!</Link>
      </p>
    </form>
  );
}
