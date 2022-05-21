import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ParkView from './screens/Park/components/ParkView';
import { render } from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
    </HashRouter>
);
