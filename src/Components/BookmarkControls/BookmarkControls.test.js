import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import BookmarkControls from './BookmarkControls';

describe('BookmarkControlsu tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookmarkControls />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer.create(<BookmarkControls />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
