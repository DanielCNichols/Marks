import React, { useState } from 'react';
import {
  useRegistrationForm,
  validationRules,
} from '../../Hooks/useRegistrationForm';
import AuthApiService from '../../Services/authService';
import TokenService from '../../Services/tokenService';

export default function RegistrationForm(props) {
  const [error, setError] = useState(null);
  const { inputs, handleChange, handleSubmit, errors } = useRegistrationForm(
    handleRegister,
    validationRules
  );

  async function handleRegister(inputs) {
    try {
      await AuthApiService.postUser(inputs);
      props.history.push('/login');
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
        <div className="form-element">
          <label htmlFor="confirmPass">Password</label>
          <input
            type="text"
            name="confirmPass"
            id="confirmPass"
            onChange={handleChange}
            value={inputs.confirmPass}
          />
        </div>

        <button type="submit">Sign up</button>
      </fieldset>
    </form>
  );
}
