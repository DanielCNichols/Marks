import React, { useState } from 'react';
import ApiService from '../../Services/api-service';
import s from './AddForm.module.css';
import { MdCancel, MdSave } from 'react-icons/md';
import isUrl from 'isurl';

export default function AddForm(props) {
  const [error, setError] = useState(null);

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
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Reddit"
            aria-placeholder="Reddit"
            aria-required="true"
            aria-label="Title"
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="https://www.reddit.com"
            aria-placeholder="https://www.reddit.com"
            aria-required="true"
            aria-label="Url"
          />
        </div>
        <div className={s.formElement}>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="desc"
            rows="5"
            placeholder="This is the best website ever."
            aria-placeholder="This is the best website ever."
            aria-required="false"
            aria-label="Description"
          />
        </div>
        {error && (
          <div role="alert" aria-live="assertive">
            <p className={s.error}>{error.message}</p>
          </div>
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
