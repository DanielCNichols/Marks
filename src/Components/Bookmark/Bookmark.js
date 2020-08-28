import React, { useState } from 'react';
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { TiArrowForward } from 'react-icons/ti';
import ApiService from '../../Services/api-service';
import RatingSpan from '../RatingSpan/RatingSpan';
import s from './Bookmark.module.css';
import { useEditForm, validationRules } from '../../Hooks/useEditForm';

export default function Bookmark({ bookmark, removeBookmark, updateBookmark }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
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

  const handleCancel = () => {
    setEditing(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleEdit = () => {
    if (!expanded) {
      setExpanded(true);
    }
    setEditing(!editing);
  };

  const deleteBookmark = id => {
    ApiService.deleteBookmark(id)
      .then(removeBookmark(id))
      .catch(error => setError(error));
  };

  const renderError = () => {
    return (
      <>
        {error ? (
          <div className={s.error} aria-live="assertive">
            {error.message}
          </div>
        ) : null}
      </>
    );
  };

  const renderCollapsed = () => {
    let { title, rating, _id, url } = bookmark;
    return (
      <section className={s.bookmarkItem}>
        <div className={s.head}>
          <h3>{title}</h3>
        </div>
        <div className={s.rating}>
          <RatingSpan rating={rating} />
        </div>
        <div className={s.itemControlsContainer}>
          <div className={s.itemControls}>
            <div className={s.tooltip}>
              <MdEdit onClick={toggleEdit} />
              <span className={s.tooltiptext}>Edit</span>
            </div>
            <div className="tooltip delete">
              <MdDelete
                onClick={() => {
                  deleteBookmark(_id);
                }}
              />
              <span className={s.tooltiptext}>Delete</span>
            </div>
            <div className={s.tooltip}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={url}
                className={s.linkButton}
              >
                <TiArrowForward />
              </a>
              <span className={s.tooltiptext}>Visit</span>
            </div>
          </div>
        </div>

        <div className={s.itemExpanded} onClick={() => handleExpand()}>
          <MdExpandMore />
          <span>More</span>
        </div>
      </section>
    );
  };

  const renderExpanded = () => {
    const { _id, title, desc, rating, url } = bookmark;

    return (
      <section id={_id} className={s.bookmarkItemExpanded}>
        <h3 className={s.headExpanded}>{title}</h3>
        <div className={s.ratingExpanded}>
          {editing ? (
            <select id={s.editRating}>
              <option value="">Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          ) : (
            <RatingSpan rating={rating} />
          )}
        </div>

        <p
          className={s.url}
          role="textbox"
          suppressContentEditableWarning={true}
          contentEditable={editing}
        >
          {url}
        </p>

        <p
          className={s.desc}
          role="textbox"
          contentEditable={editing}
          suppressContentEditableWarning={true}
        >
          {desc ? desc : 'Add a description'}
        </p>

        <div className={s.itemControlsContainerExpanded}>
          <div className={s.itemControlsExpanded}>
            {editing ? (
              <div className={s.editControl}>
                <button>Cancel</button>
                <button onClick={handleEditSubmit}>Save</button>
              </div>
            ) : (
              <>
                <div className={s.less}>
                  <MdExpandLess onClick={() => handleExpand()} />
                  <span>Less</span>
                </div>
                <div className={s.tooltip}>
                  <MdEdit className={s.tooltip} onClick={() => toggleEdit()} />
                  <span className={s.tooltiptext}>Edit</span>
                </div>
                <div className={s.tooltip}>
                  <MdDelete
                    onClick={() => {
                      deleteBookmark(_id);
                    }}
                  />
                  <span className={s.tooltiptext}>Delete</span>
                </div>
                <div className={s.tooltip}>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={url}
                    className={s.linkButton}
                  >
                    <TiArrowForward />
                  </a>
                  <span className={s.tooltiptext}>Visit</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderEditForm = () => {
    const { _id, title, desc, rating, url } = bookmark;

    return (
      <form onSubmit={handleSubmit} className={s.editForm}>
        <fieldset>
          <div className={s.editTitle}>
            <label htmlFor="title">Title</label>
            {inputErrors.title && (
              <p className={s.error}>{inputErrors.title}</p>
            )}
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
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  };

  return (
    <>
      {editing
        ? renderEditForm()
        : expanded
        ? renderExpanded()
        : renderCollapsed()}
    </>
  );
}
