import React, { useState } from 'react';
import { MdSave, MdCancel } from 'react-icons/md';
import { useEditForm, validationRules } from '../../Hooks/useEditForm';

//TODO: Make a hook to handle the edit
//TODO: Fix the rating select options

export default function EditForm({ bookmark, handleEditSubmit, handleCancel }) {
  const { inputs, handleChange, handleSubmit, errors } = useEditForm(
    bookmark,
    edit,
    validationRules
  );

  function edit(inputs) {
    handleEditSubmit(bookmark.id, inputs);
  }

  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <label className="edit-form-title">
        Title
        <input
          name="title"
          type="text"
          value={inputs.title}
          onChange={handleChange}
        />
      </label>
      <label className="edit-form-rating">
        Rating
        <select
          onChange={handleChange}
          name="rating"
          type="text"
          value={inputs.rating}
        >
          <option value="null">Please select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label className="edit-form-url">
        Url
        <input
          name="url"
          type="text"
          value={inputs.url}
          onChange={handleChange}
        />
      </label>
      <label className="edit-form-desc">
        Description
        <textarea name="desc" value={inputs.desc} onChange={handleChange} />
      </label>
      <div className="edit-form-controls">
        <button className="cancel" type="reset" onClick={handleCancel}>
          <MdCancel />
          <span>Cancel</span>
        </button>
        <button type="submit" className="save">
          <MdSave />
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
