import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

//If logged in, we will always redirect to the bookmark list.
export default function PublicRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) => (
        <UserContext.Consumer>
          {(userContext) => {
            if (userContext.user.id) {
              return <Redirect to={'/list'} />;
            } else {
              return <Component {...componentProps} />;
            }
          }}
        </UserContext.Consumer>
      )}
    />
  );
}
