import React, { useState } from 'react';
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { TiArrowForward } from 'react-icons/ti';
import ApiService from '../../Services/api-service';
import RatingSpan from '../RatingSpan/RatingSpan';
import s from './Bookmark.module.css';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';

/* //! Lets get weird. Let's make the actual bookmark editable in place.  WE can use role= textbox and contentEditable along with custom javascript to handle this. Don't forget to render the errors!*/

export default function Bookmark({
  bookmark,
  removeBookmark,
  updateBookmark,
  editToggle,
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    title: bookmark.title,
    rating: bookmark.rating,
    url: bookmark.url,
    desc: bookmark.desc,
  });

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

  const handleEditContent = ev => {
    ev.persist();
    console.log('this should be updated', ev.target.innerText);
    let newInputs = {
      ...inputs,
      [ev.target.attributes.name.value]: ev.target.innerText,
    };
    setInputs(newInputs);

    handleEditSubmit();
  };

  const handleEditSubmit = () => {
    let newBookmark = {
      ...inputs,
    };

    console.log(newBookmark);
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
      <form className={s.editForm}>
        <fieldset>
          <div className={s.editTitle}>
            <label>Title</label>
            <input type="text" value={title} />
          </div>
          <div className={s.editRating}>
            <label>Rating</label>
            <select>
              <option value="">Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className={s.editUrl}>
            <label>Url</label>
            <input type="text" value={url} />
          </div>

          <div className={s.editDesc}>
            <label>Description</label>
            <textarea className={s.desc} />
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
