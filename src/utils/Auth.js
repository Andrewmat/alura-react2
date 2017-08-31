import React from 'react';
import { Redirect } from 'react-router-dom';

const authToken = () => {
  return localStorage.getItem('auth-token');
}

const checkAuth = () => {
  return authToken() !== null;
}

const authComponent = (component) => {
  return () => {
    return checkAuth()
      ? component
      : (<Redirect to="/?error_msg=no_login"/>);
  }
}

export {
  authToken,
  checkAuth,
  authComponent
};
