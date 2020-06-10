import React from 'react';
import './App.css';
import ApiService from './Services/api-service';
import BookmarkControls from './Components/BookmarkControls/BookmarkControls';
import BookmarksList from './Components/BookmarkList/BookmarksList';
import Button from './Components/Button/Button';
import AddForm from './Components/AddForm/AddForm';
import Footer from './Components/Footer/Footer';
import Modal from './Components/Modal/Modal';

class App extends React.Component {
  state = {
    bookmarks: [],
    editing: false,
    adding: false,
    error: null,
  };

  componentDidMount() {
    ApiService.getBookmarks()
      .then(res => {
        this.setState({ bookmarks: res });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  addToggle = () => {
    this.setState({ adding: !this.state.adding });
  };

  editToggle = () => {
    this.setState({ editing: !this.state.editing });
  };

  addBookmark = newBookmark => {
    let newList = [...this.state.bookmarks, newBookmark];
    this.setState({ bookmarks: newList });
  };

  removeBookmark = id => {
    let newList = this.state.bookmarks.filter(bm => bm.id !== id);
    this.setState({ bookmarks: newList });
  };

  deleteBookmark = id => {
    ApiService.deleteBookmark(id)
      .then(this.removeBookmark(id))
      .catch(error => this.setState({ error: error.message }));
  };

  sortBookmarks = value => {
    let { bookmarks } = this.state;
    value === 'asc'
      ? this.setState({
          bookmarks: bookmarks.sort((a, b) => a.rating - b.rating),
        })
      : this.setState({
          bookmarks: bookmarks.sort((a, b) => b.rating - a.rating),
        });
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
    return (
      <div className="App" aria-live="polite">
        <header>
          <h1>:Marks</h1>
          <p>Bookmarking as simple as :q!</p>
        </header>
        <main aria-live="polite">
          <div className="control">
            <BookmarkControls sort={this.sortBookmarks} />
          </div>
          <div className="list">
            <div className="add">
              {this.state.adding === true ? (
                <Modal>
                  <AddForm
                    addToggle={this.addToggle}
                    addBookmark={this.addBookmark}
                  />
                </Modal>
              ) : null}
            </div>
            {this.state.error ? (
              this.renderError()
            ) : (
              <BookmarksList
                editToggle={this.editToggle}
                bookmarks={this.state.bookmarks}
                deleteBm={this.deleteBookmark}
                edit={this.updateBookmark}
              />
            )}
          </div>
          {!this.state.adding && !this.state.editing ? (
            <Button className="add-button" toggleAdd={this.addToggle}></Button>
          ) : null}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
