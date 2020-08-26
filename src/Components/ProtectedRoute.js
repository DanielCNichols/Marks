import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) => (
        <UserContext.Consumer>
          {(userContext) =>
            !!userContext.user.id ? (
              <Component {...componentProps} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: componentProps.location },
                }}
              />
            )
          }
        </UserContext.Consumer>
      )}
    />
  );
}
