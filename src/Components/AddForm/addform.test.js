import React from 'react';
import ReactDOM from 'react-dom';
import AddForm from './AddForm';
import renderer from 'react-test-renderer';

describe('Add form tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer.create(<AddForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
