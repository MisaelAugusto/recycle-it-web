import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import PreRegister from '../pages/PreRegister';
import RecyclerRegister from '../pages/RecyclerRegister';
import RecyclerDashboard from '../pages/RecyclerDashboard';
import CollectPointRegister from '../pages/CollectPointRegister';
import CollectPointDashboard from '../pages/CollectPointDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/pre-register" exact component={PreRegister} />

      <Route
        path="/recycler-register"
        exact
        component={RecyclerRegister}
        isPrivate
      />
      <Route
        path="/collect-point-register"
        exact
        component={CollectPointRegister}
        isPrivate
      />

      <Route
        path="/recycler/dashboard"
        exact
        component={RecyclerDashboard}
        isPrivate
      />
      <Route
        path="/collect-point/dashboard"
        exact
        component={CollectPointDashboard}
        isPrivate
      />
    </Switch>
  );
};

export default Routes;
