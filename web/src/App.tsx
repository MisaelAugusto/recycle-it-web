import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import PreRegister from './pages/PreRegister';
import RegisterCollectPoint from './pages/RegisterCollectPoint';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={PreRegister} />
        <Route path="/register/collect-point" component={RegisterCollectPoint} />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
