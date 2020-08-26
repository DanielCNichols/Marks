import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../Loginform/LoginForm';

export default function LandingPage(props) {
  function handleLoginSuccess() {
    props.history.push('/list');
  }
  return (
    <>
      <header>
        <h1>:Marks</h1>
        <p>Bookmarking as simple as :q!</p>
      </header>
      <div style={{ display: 'grid', gridColumn: '1fr 1fr' }}>
        <div className='formContainer' style={{ gridColumnStart: '2' }}>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
        <div className='onBoarding' style={{ gridColumnStart: '1' }}>
          <p>Get started</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
            assumenda laudantium, neque qui, debitis accusantium ipsum aliquid
            rem asperiores ad facilis. Dolore est nesciunt fuga nihil
            consequatur aperiam ipsam saepe.
          </p>
        </div>
      </div>

      <Link to={'/register'}>or sign up!</Link>
    </>
  );
}
