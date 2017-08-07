import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import Timeline from './components/Timeline';
import { checkAuth } from './utils/Auth';
import registerServiceWorker from './registerServiceWorker';

import './css/login.css';
import './css/reset.css';
import './css/timeline.css';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/timeline" render={checkAuth(<Timeline/>)} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </App>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
