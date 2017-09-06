import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import Timeline from './components/Timeline';
import TimelineStore from 'TimelineStore';
import { checkAuth } from './utils/Auth';
import registerServiceWorker from './registerServiceWorker';

import './css/login.css';
import './css/reset.css';
import './css/timeline.css';

const timelineStore = new TimelineStore();

const authComponent = (component) => {
  return checkAuth()
    ? component
    : (<Redirect to="/?error_msg=no_login"/>);
}

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/timeline" render={() => authComponent(<Timeline store={timelineStore}/>)} />
        <Route path="/timeline/:user" render={(props) => <Timeline store={timelineStore} {...props} />} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </App>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();