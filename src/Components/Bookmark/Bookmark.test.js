import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Bookmark from './Bookmark';

const bookmark = {
  title: 'test title',
  desc: 'A test bookmark',
  rating: 3,
  url: 'https://www.twitter.com',
};

describe('Bookmark tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Bookmark bookmark={bookmark} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer.create(<Bookmark bookmark={bookmark} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
