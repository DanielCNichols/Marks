import React from 'react';
import './BookmarkControls.css';

export default function BookmarkControls({ sort }) {
  const handleSort = val => {
    sort(val);
  };

  return (
    <div>
      <select
        className="sort-select"
        name="sort"
        aria-label="Sort by rating"
        onChange={ev => handleSort(ev.target.value)}
      >
        <option value="">Sort by rating</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
