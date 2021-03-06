import React, { useState, useEffect } from 'react';
import Bookmark from '../Bookmark/Bookmark';
import AddForm from '../AddForm/AddForm';
import Button from '../Button/Button';
import ApiService from '../../Services/api-service';
import Loading from '../Loading/Loading';
import BookmarkControls from '../BookmarkControls/BookmarkControls';
import s from './BookmarksList.module.css';

export default function BookmarksList(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //IDEA: Pass in filter value (or null, if initial load) to get bookmarks. Backend handles filtering through conditions in the route.
  useEffect(() => {
    ApiService.getBookmarks()
      .then(res => {
        setBookmarks(res);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

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

  const addToggle = () => {
    setAdding(!adding);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={s.BookmarksList}>
          {error && <p>{error}</p>}
          <div className="add">
            {adding === true ? (
              <AddForm addToggle={addToggle} addBookmark={addBookmark} />
            ) : null}
          </div>

          {!adding ? (
            <>
              <div className={s.control}>
                <BookmarkControls sort={sortBookmarks} />
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
            </>
          ) : null}

          {!adding ? <Button toggleAdd={addToggle}></Button> : null}
        </div>
      )}
    </>
  );
}
