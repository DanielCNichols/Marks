import React, { useState } from 'react';
import ApiService from '../../Services/api-service';
import './AddForm.css';
import { MdCancel, MdSave } from 'react-icons/md';

export default function AddForm(props) {
  const [error, setError] = useState(null); // Do I need to make another piece of state here? Could there be a"global error" in this case?

  const handleSubmit = e => {
    e.preventDefault();
    const { title, url, desc, rating } = e.target;
    const newBookmark = {
      title: title.value,
      url: url.value,
      desc: desc.value,
      rating: rating.value,
    };

    ApiService.postBookmark(newBookmark)
      .then(res => {
        props.addBookmark(res);
        props.addToggle();
      })
      .catch(error => this.setState({ error: error }));
  };

  const { addToggle } = props;
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Bookmark</legend>
        <label className="add-form-title">
          Title
          <input
            type="text"
            name="title"
            aria-required="true"
            aria-label="Title"
          />
        </label>
        <label className="add-form-url">
          Url
          <input type="text" name="url" aria-required="true" aria-label="Url" />
        </label>
        <label className="add-form-rating">
          Rating
          <select
            name="rating"
            aria-required="false"
            aria-label="Select Rating"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label className="add-form-desc">
          Description
          <textarea
            name="desc"
            rows="5"
            id="desc"
            aria-required="false"
            aria-label="Description"
          />
        </label>
        <div className="add-form-controls">
          <button className="cancel" type="button" onClick={addToggle}>
            <MdCancel />
            <span>Cancel</span>
          </button>
          <button className="save" type="submit">
            <MdSave />
            <span>Save</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}
