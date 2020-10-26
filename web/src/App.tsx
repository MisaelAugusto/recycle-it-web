import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import PreRegister from './pages/PreRegister';
import RecyclerRegister from './pages/RecyclerRegister';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pre-register" component={PreRegister} />
        <Route path="/recycler-register" component={RecyclerRegister} />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
