import React, { useState } from 'react';
import { useLoginForm, validationRules } from '../../Hooks/useLoginForm';
import { useEditForm } from '../../Hooks/useEditForm';
import AuthApiService from '../../Services/authService';
import TokenService from '../../Services/tokenService';

export default function LoginForm(props) {
  const [error, setError] = useState(null);
  const { inputs, handleChange, handleSubmit, errors } = useLoginForm(
    handleLogin,
    validationRules
  );

  async function handleLogin(inputs) {
    try {
      let { token } = await AuthApiService.postLogin(inputs);
      TokenService.saveAuthToken(token);
      props.history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div className="form-element">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={inputs.username}
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
          />
        </div>

        <button type="submit">Login</button>
      </fieldset>
    </form>
  );
}
