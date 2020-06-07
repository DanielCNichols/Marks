import React from 'react';
import './BookmarkControls.css';

export default function BookmarkControls(props) {
  const handleSort = function(ev) {
    console.log(ev.target.sort.value);
    ev.preventDefault();
    props.sort(ev.target.sort.value);
  };

  return (
    <div>
      <form onSubmit={handleSort}>
        <label>
          Sort by rating
          <select
            className="sort-select"
            name="sort"
            aria-label="Sort by rating"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <button className="sort">Sort</button>
      </form>
    </div>
  );
}
