import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import PreRegister from './pages/PreRegister';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/pre-register" component={PreRegister} />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
