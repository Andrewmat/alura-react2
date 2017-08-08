import React from 'react';
import { Redirect } from 'react-router-dom';

const requestServer = (endpoint, data) => {
  data = data || {};
  data.headers = data.headers || new Headers();
  data.headers.set('X-AUTH-TOKEN', localStorage.getItem('auth-token'));
  return fetch(`http://localhost:8080/api${endpoint}`, data)
}

const checkAuth = (component) => {
  return () => {
    if (localStorage.getItem('auth-token') === null) {
      return (
        <Redirect to="/?error_msg=no_login"/>
      )
    } else {
      return component;
    }
  }
}

export { checkAuth, requestServer };