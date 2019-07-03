import React from 'react';
import './index.css';
import App from './App';
import ParkView from './components/ParkView';
import { render } from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';

render(
    <HashRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact
          path="/parks/:id"
          component={ParkView}/>
        </Switch>
      </div>
    </HashRouter>,
  document.getElementById('root'),
);
