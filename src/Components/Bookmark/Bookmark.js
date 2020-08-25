import React, { useState } from 'react';
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { TiArrowForward } from 'react-icons/ti';
import ApiService from '../../Services/api-service';
import RatingSpan from '../RatingSpan/RatingSpan';
import './Bookmark.css';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';

export default function Bookmark({ bookmark, deleteBm, updateBookmark }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    setEditing(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditSubmit = (id, updated) => {
    ApiService.editBookmark(id, updated)
      .then(res => {
        setEditing(false);
        updateBookmark(res);
      })
      .catch(error => setError(error));
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const renderError = () => {
    return (
      <>
        {error ? (
          <div className="error" aria-live="assertive">
            {error.message}
          </div>
        ) : null}
      </>
    );
  };

  const renderCollapsed = () => {
    let { title, rating, _id, url } = bookmark;
    return (
      <section className="bookmark-item">
        {editing && (
          <Modal>
            <EditForm
              bookmark={bookmark}
              handleEditSubmit={handleEditSubmit}
              handleCancel={handleCancel}
            />
          </Modal>
        )}
        <div className="head">
          <h3>{title}</h3>
        </div>
        <div className="rating">
          <RatingSpan rating={rating} />
        </div>
        <div className="item-controls-container">
          <div className="item-controls">
            <div className="tooltip">
              <MdEdit onClick={handleEdit} />
              <span className="tooltiptext">Edit</span>
            </div>
            <div className="tooltip delete">
              <MdDelete
                onClick={() => {
                  deleteBm(_id);
                }}
              />
              <span className="tooltiptext">Delete</span>
            </div>
            <div className="tooltip">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={url}
                className="linkbutton"
              >
                <TiArrowForward />
              </a>
              <span className="tooltiptext">Visit</span>
            </div>
          </div>
        </div>
        <div className="item-expand" onClick={() => handleExpand()}>
          <MdExpandMore />
          <span>More</span>
        </div>
      </section>
    );
  };

  const renderExpanded = () => {
    const { _id, title, desc, rating, url } = bookmark;

    return (
      <section className="bookmark-item-expanded">
        <div className="head-expanded">
          <h3>{title}</h3>
        </div>
        <div className="rating-expanded">
          <RatingSpan rating={rating} />
        </div>
        <div className="url">
          <p>{url}</p>
        </div>
        <div className="desc">
          <p>{desc ? desc : 'Add a description'}</p>
        </div>
        <div className="item-controls-container-expand">
          <div className="item-controls-expand">
            <div className="less">
              <MdExpandLess onClick={() => handleExpand()} />
              <span>Less</span>
            </div>
            <div className="tooltip">
              <MdEdit className="tooltip" onClick={() => setEditing(true)} />
              <span className="tooltiptext">Edit</span>
            </div>
            <div className="tooltip">
              <MdDelete
                onClick={() => {
                  deleteBm(_id);
                }}
              />
              <span className="tooltiptext">Delete</span>
            </div>
            <div className="tooltip">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={url}
                className="linkbutton"
              >
                <TiArrowForward />
              </a>
              <span className="tooltiptext">Visit</span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <>{!expanded ? renderCollapsed() : renderExpanded()}</>;
}
