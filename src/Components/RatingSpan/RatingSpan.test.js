import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RatingSpan from './RatingSpan';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPage tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RatingSpan />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected when there is no value prop', () => {
    const tree = renderer.create(<RatingSpan />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the UI as expected when there is a value prop', () => {
    const tree = renderer.create(<RatingSpan value={3} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
