import React, { useContext } from 'react';
import s from './NavBar.module.css';
import UserContext from '../../context/userContext';
import TokenService from '../../Services/tokenService';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  const userContext = useContext(UserContext);

  function handleLogout() {
    userContext.processLogout();
  }
  return (
    <nav className={s.navBar}>
      <div className={s.logo}>
        <span>LOGO</span>
      </div>

      {userContext.user.id ? (
        <Link onClick={() => handleLogout()} to={'/'}>
          Logout
        </Link>
      ) : (
        <p>
          <Link to={'/login'}>Login</Link>
        </p>
      )}
    </nav>
  );
}
