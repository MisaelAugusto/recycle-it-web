import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import PreRegister from '../pages/PreRegister';
import RecyclerRegister from '../pages/RecyclerRegister';
// import RecyclerDashboard from '../pages/RecyclerDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/pre-register" component={PreRegister} />
      <Route path="/recycler-register" component={RecyclerRegister} />
    </Switch>
  );
};

export default Routes;
