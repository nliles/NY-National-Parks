import React from 'react';
import './index.css';
import App from './App';
import { Route, Switch, HashRouter } from 'react-router-dom';

render(
    <HashRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </div>
    </HashRouter>,
  document.getElementById('root'),
);
