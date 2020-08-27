import React, { useState, useContext } from 'react';
import { useLoginForm, validationRules } from '../../Hooks/useLoginForm';
import AuthApiService from '../../Services/authService';
import UserContext from '../../context/userContext';
import s from './LoginForm.module.css';

export default function LoginForm(props) {
  const [error, setError] = useState(null);
  const { inputs, handleChange, handleSubmit, inputErrors } = useLoginForm(
    handleLogin,
    validationRules
  );

  const user = useContext(UserContext);

  async function handleLogin(inputs) {
    try {
      setError(null);
      let res = await AuthApiService.postLogin(inputs);
      user.processLogin(res.token);
      props.onSuccess();
    } catch ({ error }) {
      setError(error);
    }
  }

  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <fieldset>
        <legend> Sign In</legend>
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
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor="password">Password</label>
          {inputErrors.password && (
            <p className={s.error}>{inputErrors.password}</p>
          )}
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
          />
        </div>

        {error && (
          <div className={s.postError}>
            <p>{error}</p>
          </div>
        )}

        <button className={s.submit} type="submit">
          Login
        </button>
      </fieldset>
    </form>
  );
}
