import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Loginform/LoginForm';
import Register from './Components/RegistrationForm/RegistrationForm';
import LandingPage from './Components/LandingPage/LandingPage';
import BookmarkList from './Components/BookmarkList/BookmarksList';

function App() {
  return (
    <div className="App" aria-live="polite">
      <main aria-live="polite">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/list" component={BookmarkList} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
