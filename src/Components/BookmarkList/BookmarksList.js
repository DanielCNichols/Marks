import React, { useState, useEffect } from 'react';
import Bookmark from '../Bookmark/Bookmark';
import Modal from '../Modal/Modal';
import AddForm from '../AddForm/AddForm';
import Button from '../Button/Button';
import ApiService from '../../Services/api-service';
import BookmarkControls from '../BookmarkControls/BookmarkControls';

export default function BookmarksList(props) {
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

  const sortBookmarks = value => {
    value === 'asc'
      ? setBookmarks([...bookmarks.sort((a, b) => a.rating - b.rating)])
      : setBookmarks([...bookmarks.sort((a, b) => b.rating - a.rating)]);
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

  console.log('this si the list prop', props);

  const addToggle = () => {
    setAdding(!adding);
  };

  return (
    <div>
      <div className="control">
        <BookmarkControls sort={sortBookmarks} />
      </div>
      <div className="add">
        {adding === true ? (
          <Modal>
            <AddForm addToggle={addToggle} addBookmark={addBookmark} />
          </Modal>
        ) : null}
      </div>
      {!bookmarks.length ? (
        <>
          <p>You haven't added any bookmarks yet. </p>
          <p>Tap the green button to get started!</p>
        </>
      ) : (
        bookmarks.map(mark => (
          <Bookmark
            key={mark._id}
            bookmark={mark}
            updateBookmark={updateBookmark}
            removeBookmark={removeBookmark}
          />
        ))
      )}

      {!adding && !editing ? (
        <Button className="add-button" toggleAdd={addToggle}></Button>
      ) : null}
    </div>
  );
}
