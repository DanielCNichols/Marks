import React, { useState } from 'react';
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { TiArrowForward } from 'react-icons/ti';
import ApiService from '../../Services/api-service';
import RatingSpan from '../RatingSpan/RatingSpan';
import s from './Bookmark.module.css';
import EditForm from '../EditForm/EditForm';

export default function Bookmark({ bookmark, removeBookmark, updateBookmark }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

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
          <RatingSpan rating={rating} />
        </div>

        <p className={s.url}>{url}</p>

        <p className={s.desc}>{desc ? desc : 'Add a description'}</p>

        <div className={s.itemControlsContainerExpanded}>
          <div className={s.itemControlsExpanded}>
            <div className={s.less} onClick={() => handleExpand()}>
              <MdExpandLess />
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
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {editing ? (
        <EditForm
          bookmark={bookmark}
          updateBookmark={updateBookmark}
          toggleEdit={toggleEdit}
        />
      ) : expanded ? (
        renderExpanded()
      ) : (
        renderCollapsed()
      )}
    </>
  );
}
