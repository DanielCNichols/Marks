import React from 'react';
import Bookmark from '../Bookmark/Bookmark';

export default function BookmarksList(props) {
  const items = props.bookmarks;
  const { editToggle, deleteBm, updateBookmark } = props;
  return (
    <div>
      {!items.length ? (
        <>
          <p>You haven't added any bookmarks yet. </p>
          <p>Tap the green button to get started!</p>
        </>
      ) : (
        items.map(item => (
          <Bookmark
            key={item._id}
            bookmark={item}
            updateBookmark={updateBookmark}
            deleteBm={deleteBm}
          />
        ))
      )}
    </div>
  );
}
