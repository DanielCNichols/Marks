import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Bookmark tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
