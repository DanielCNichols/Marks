import React from 'react';
import './EditForm.css';

export default class EditForm extends React.Component {
  state = {
    error: null,
  };

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

  render() {
    let { title, desc, rating, id, url } = this.props.bookmark;
    return (
      <section className="add-form">
        <form>
          <fieldset>
            <legend>
              Add Bookmark
              <label>
                Title
                <input type="text" value={title} name="title" />
              </label>
              <label>
                Url
                <input type="text" value={url} name="url" />
              </label>
              <label>
                Rating
                <select value={rating} name="rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              <label>
                Description
                <textarea value={desc} name="desc" rows="5" className="desc" />
              </label>
            </legend>
          </fieldset>
          {this.renderError()}
          <button type="submit">Add</button>
          <button>Cancel</button>
        </form>
      </section>
    );
  }
}
