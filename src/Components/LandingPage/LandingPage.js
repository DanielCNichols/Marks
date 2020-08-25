import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(props) {
  return (
    <>
      <header>
        <h1>:Marks</h1>
        <p>Bookmarking as simple as :q!</p>
      </header>
      <p>You know what to do. Just get to marking</p>
      <Link to={'/login'}>Login</Link> or{' '}
      <Link to={'/register'}>or sign up!</Link>
    </>
  );
}
