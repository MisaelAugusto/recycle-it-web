import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  path: string;
  isPrivate?: boolean;
  component?: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  path,
  component: Component,
  ...rest
}) => {
  const { user, userType } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        let redirectPath;

        if (user) {
          redirectPath = `/${userType}${
            user.city ? '/dashboard' : '-register'
          }`;
        } else {
          redirectPath = isPrivate ? '/' : path;
        }

        return redirectPath === path ? (
          Component && <Component />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default Route;
