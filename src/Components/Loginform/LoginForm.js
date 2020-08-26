import React, { useState, useContext } from 'react';
import { useLoginForm, validationRules } from '../../Hooks/useLoginForm';
import AuthApiService from '../../Services/authService';
import TokenService from '../../Services/tokenService';
import UserContext from '../../context/userContext';

export default function LoginForm(props) {
  const [error, setError] = useState(null);
  const { inputs, handleChange, handleSubmit, inputErrors } = useLoginForm(
    handleLogin,
    validationRules
  );

  const user = useContext(UserContext);

  async function handleLogin(inputs) {
    try {
      let { token } = await AuthApiService.postLogin(inputs);
      user.processLogin(token);
      // TokenService.saveAuthToken(token);
      props.onSuccess();
    } catch ({ error }) {
      setError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div className='form-element'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={handleChange}
            value={inputs.username}
          />
        </div>
        <div className='form-element'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={handleChange}
            value={inputs.password}
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

        {error && <p className='error'>{error}</p>}

        <button type='submit'>Login</button>
      </fieldset>
    </form>
  );
}
