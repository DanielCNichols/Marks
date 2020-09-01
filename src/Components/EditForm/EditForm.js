import React, { useState, useEffect } from 'react';
import { useEditForm, validationRules } from '../../Hooks/useEditForm';
import ApiService from '../../Services/api-service';
import s from './EditForm.module.css';
export default function EditForm({ bookmark, updateBookmark, toggleEdit }) {
  const [error, setError] = useState(null);
  const { inputs, handleChange, handleSubmit, inputErrors } = useEditForm(
    bookmark,
    handleEditSubmit,
    validationRules
  );

  async function handleEditSubmit(id, updated) {
    try {
      let res = await ApiService.editBookmark(id, updated);
      updateBookmark(res);
      toggleEdit();
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={s.editForm}>
      <fieldset>
        <div className={s.editTitle}>
          <label htmlFor="title">Title</label>
          {inputErrors.title && <p className={s.error}>{inputErrors.title}</p>}
          <input
            name="title"
            onChange={handleChange}
            value={inputs.title}
            type="text"
          />
        </div>
        <div className={s.editRating}>
          <label htmlFor="rating">Rating</label>
          <select name="rating" onChange={handleChange} value={inputs.rating}>
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={s.editUrl}>
          <label htmlFor="url">Url</label>
          {inputErrors.url && <p className={s.error}>{inputErrors.url}</p>}
          <input
            name="url"
            onChange={handleChange}
            value={inputs.url}
            type="text"
          />
        </div>

        <div className={s.editDesc}>
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            onChange={handleChange}
            value={inputs.desc}
            className={s.desc}
          />

          {error && (
            <div className={s.error} aria-live="assertive">
              {error.message}
            </div>
          )}
        </div>

        <div className={s.editControlsContainer}>
          <div className={s.editFormControls}>
            <button
              className={s.cancel}
              type="button"
              onClick={() => toggleEdit()}
            >
              Cancel
            </button>
            <button className={s.submit} type="submit">
              Save
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
