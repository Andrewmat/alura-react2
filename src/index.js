import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';

import timeline from './reducers/timeline';
import header from './reducers/header';
import { isAuth } from './utils/Auth';

import registerServiceWorker from './registerServiceWorker';

import './css/login.css';
import './css/reset.css';
import './css/timeline.css';

let reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunk));

const appComponent = (props) =>
  (props.match
  && props.match.params
  && props.match.params.user)
  || isAuth()
  ? <App {...props}/>
  : (<Redirect to="/?error_msg=no_login"/>);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/timeline" render={appComponent} />
        <Route path="/timeline/:user" render={appComponent} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root'));

registerServiceWorker();