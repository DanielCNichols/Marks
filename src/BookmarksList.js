import React from 'react';
import Bookmark from './Bookmark';

export default function BookmarksList(props) {
  const items = props.bookmarks;
  const { editToggle, deleteBm, edit } = props;
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
            key={item.id}
            bookmark={item}
            editBm={edit}
            deleteBm={deleteBm}
            editToggle={editToggle}
          />
        ))
      )}
    </div>
  );
}
