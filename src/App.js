import React, { useState, useEffect } from 'react';
import './App.css';
import ApiService from './Services/api-service';
import BookmarkControls from './Components/BookmarkControls/BookmarkControls';
import BookmarksList from './Components/BookmarkList/BookmarksList';
import Button from './Components/Button/Button';
import AddForm from './Components/AddForm/AddForm';
import Footer from './Components/Footer/Footer';
import Modal from './Components/Modal/Modal';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Loginform/LoginForm';
import Register from './Components/RegistrationForm/RegistrationForm';

function App() {
  return (
    <div className="App" aria-live="polite">
      <header>
        <h1>:Marks</h1>
        <p>Bookmarking as simple as :q!</p>
      </header>
      <main aria-live="polite">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={BookmarksList} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
