import React from 'react';
import './BookmarkControls.css';

export default function BookmarkControls({ sort }) {
  const handleSort = val => {
    sort(val);
  };

  return (
    <div>
      <label>
        Sort by rating
        <select
          className="sort-select"
          name="sort"
          aria-label="Sort by rating"
          onChange={ev => handleSort(ev.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
