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
  const [bookmarks, setBookmarks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  //IDEA: Pass in filter value (or null, if initial load) to get bookmarks. Backend handles filtering through conditions in the route.
  useEffect(() => {
    ApiService.getBookmarks()
      .then(res => {
        setBookmarks(res);
      })
      .catch(error => {
        setError(error);
      });
  }, [filter]);

  const addToggle = () => {
    setAdding(!adding);
  };

  const addBookmark = newBookmark => {
    let newList = [...bookmarks, newBookmark];
    setBookmarks(newList);
  };

  const updateBookmark = newBookmark => {
    let index = bookmarks.findIndex(bm => bm._id === newBookmark._id);
    let newList = [...bookmarks];
    newList[index] = newBookmark;
    setBookmarks(newList);
  };

  const removeBookmark = id => {
    let newList = bookmarks.filter(bm => bm._id !== id);
    setBookmarks(newList);
  };

  const deleteBookmark = id => {
    ApiService.deleteBookmark(id)
      .then(removeBookmark(id))
      .catch(error => setError(error));
  };

  const sortBookmarks = value => {
    value === 'asc'
      ? setBookmarks(bookmarks.sort((a, b) => a.rating - b.rating))
      : setBookmarks(bookmarks.sort((a, b) => b.rating - a.rating));
  };

  //TODO: Filter by rating, search bar (good chance to use debounce!)

  //This will filter by value and up...
  const filterBookmarks = value => {
    //Should trigger a refetch of the bookmarks with useEffect();
    //Handle filtering on backend.
    setFilter(value);
  };

  const clearFilter = () => {
    setFilter(null);
  };

  return (
    <div className="App" aria-live="polite">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <header>
        <h1>:Marks</h1>
        <p>Bookmarking as simple as :q!</p>
      </header>
      <main aria-live="polite">
        <div className="control">
          <BookmarkControls sort={sortBookmarks} />
        </div>
        <div className="list">
          <div className="add">
            {adding === true ? (
              <Modal>
                <AddForm addToggle={addToggle} addBookmark={addBookmark} />
              </Modal>
            ) : null}
          </div>
          <BookmarksList
            bookmarks={bookmarks}
            updateBookmark={updateBookmark}
            deleteBm={deleteBookmark}
          />
        </div>
        {!adding && !editing ? (
          <Button className="add-button" toggleAdd={addToggle}></Button>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;
