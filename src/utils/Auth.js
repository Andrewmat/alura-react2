import React from 'react';
import { Redirect } from 'react-router-dom';

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

export { checkAuth };