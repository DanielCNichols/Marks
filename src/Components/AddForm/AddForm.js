import React, { useState } from 'react';
import ApiService from '../../Services/api-service';
import s from './AddForm.module.css';
import { MdCancel, MdSave } from 'react-icons/md';
import isUrl from 'isurl';

export default function AddForm(props) {
  const [error, setError] = useState(null); // Do I need to make another piece of state here? Could there be a"global error" in this case?

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const { title, url, desc, rating } = e.target;

      if (!title.value || !url.value) {
        throw new Error('Title and Url are required');
      }

      if (!isUrl(new URL(url.value))) {
        throw new Error('Must be a valid url');
      }

      const newBookmark = {
        title: title.value,
        url: url.value,
        desc: desc.value,
        rating: rating.value,
      };

      let res = await ApiService.postBookmark(newBookmark);
      props.addBookmark(res);
      props.addToggle();
    } catch (error) {
      setError(error);
    }
  }

  const { addToggle } = props;
  return (
    <form className={s.addForm} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Bookmark</legend>
        <div className={s.formElement}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            aria-required="true"
            aria-label="Title"
          />
        </div>
        <div className={s.formElement}>
          <label>Url</label>
          <input type="text" name="url" aria-required="true" aria-label="Url" />
        </div>
        <div className={s.formElement}>
          <label>Rating</label>
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
        </div>
        <div className={s.formElement}>
          <label>Description</label>
          <textarea
            name="desc"
            rows="5"
            id="desc"
            aria-required="false"
            aria-label="Description"
          />
        </div>
        {error && (
          <>
            <p style={{ color: 'white' }}>{error.message}</p>
          </>
        )}
        <div className={s.formControls}>
          <button className={s.cancel} type="button" onClick={addToggle}>
            <MdCancel />
            <p>Cancel</p>
          </button>
          <button className={s.submit} type="submit">
            <MdSave />
            <p>Save</p>
          </button>
        </div>
      </fieldset>
    </form>
  );
}
