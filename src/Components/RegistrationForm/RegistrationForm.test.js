import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter } from 'react-router-dom';

describe('Registration Form tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <RegistrationForm />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
