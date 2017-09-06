import React from 'react';
import { Redirect } from 'react-router-dom';

const authToken = () => {
  return localStorage.getItem('auth-token');
}

const checkAuth = () => {
  return authToken() !== null;
}

export {
  authToken,
  checkAuth
};