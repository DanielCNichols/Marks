import React from 'react';
import {
  MdDelete,
  MdEdit,
  MdExpandMore,
  MdExpandLess,
  MdSave,
  MdCancel,
} from 'react-icons/md';
import { TiArrowForward } from 'react-icons/ti';
import ApiService from '../../Services/api-service';
import RatingSpan from '../RatingSpan/RatingSpan';
import './Bookmark.css';

export default class Bookmark extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      editing: false,
      desc: this.props.bookmark.desc,
      id: this.props.bookmark.id,
      title: this.props.bookmark.title,
      rating: this.props.bookmark.rating,
      url: this.props.bookmark.url,
      error: null,
    };
    this.baseState = this.state;
  }

  handleCancel = () => {
    this.props.editToggle();
    this.setState(this.baseState);
  };

  handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleEditSubmit = ev => {
    ev.preventDefault();
    let { id } = this.props.bookmark;
    const { title, desc, url, rating } = ev.target;
    const updatedBookmark = {
      title: title.value,
      desc: desc.value,
      url: url.value,
      rating: rating.value,
    };
    ApiService.editBookmark(id, updatedBookmark)
      .then(() => {
        this.setState({ editing: false });
        this.props.editToggle();
      })
      .catch(error => this.setState({ error: error }));
  };

  handleEdit() {
    const { editToggle } = this.props;
    const { editing } = this.state;
    editToggle();
    this.setState({ editing: !editing, expanded: true });
  }

  renderError() {
    const { error } = this.state;
    return (
      <>
        {error ? (
          <div className="error" aria-live="assertive">
            {error.message}
          </div>
        ) : null}
      </>
    );
  }

  renderCollapsed() {
    let { title, rating, id, url } = this.state;
    return (
      <section className="bookmark-item">
        <div className="head">
          <h3>{title}</h3>
        </div>
        <div className="rating">
          <RatingSpan rating={rating} />
        </div>
        <div className="item-controls-container">
          <div className="item-controls">
            <div className="tooltip">
              <MdEdit
                onClick={() => {
                  this.handleEdit();
                }}
              />
              <span className="tooltiptext">Edit</span>
            </div>
            <div className="tooltip delete">
              <MdDelete
                onClick={() => {
                  this.props.deleteBm(id);
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
        <div className="item-expand" onClick={() => this.handleExpand()}>
          <MdExpandMore />
          <span>More</span>
        </div>
      </section>
    );
  }

  renderExpanded() {
    const { id, title, desc, rating, url } = this.state;
    const { editing } = this.state;
    return (
      <>
        {editing !== true ? (
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
                  <MdExpandLess onClick={() => this.handleExpand()} />
                  <span>Less</span>
                </div>
                <div className="tooltip">
                  <MdEdit
                    className="tooltip"
                    onClick={() =>
                      this.setState({ editing: !this.stateEditing })
                    }
                  />
                  <span className="tooltiptext">Edit</span>
                </div>
                <div className="tooltip">
                  <MdDelete
                    onClick={() => {
                      this.props.deleteBm(id);
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
        ) : (
          <>
            <section className="bookmark-item-form">
              <form className="bookmark-form" onSubmit={this.handleEditSubmit}>
                <label className="edit-form-title">
                  Title
                  <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.onEdit}
                  />
                </label>
                <label className="edit-form-rating">
                  Rating
                  <select
                    name="rating"
                    type="text"
                    value={rating}
                    onChange={this.onEdit}
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
                    value={url}
                    onChange={this.onEdit}
                  />
                </label>
                <label className="edit-form-desc">
                  Description
                  <textarea name="desc" value={desc} onChange={this.onEdit} />
                </label>
                <div className="edit-form-controls">
                  <button
                    className="cancel"
                    type="reset"
                    onClick={this.handleCancel}
                  >
                    <MdCancel />
                    <span>Cancel</span>
                  </button>
                  <button type="submit" className="save">
                    <MdSave />
                    <span>Submit</span>
                  </button>
                </div>
                {this.renderError()}
              </form>
            </section>
          </>
        )}
      </>
    );
  }

  onEdit = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let { expanded } = this.state;
    return <>{!expanded ? this.renderCollapsed() : this.renderExpanded()}</>;
  }
}
