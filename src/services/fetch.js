import { authToken, isAuth } from '../utils/Auth';

const fetchAuth = (endpoint, data, ...args) => {
  data = data || {};
  if (isAuth()) {
    data.headers = data.headers || new Headers();
    data.headers.set('X-AUTH-TOKEN', authToken());
  }
  return fetch(`http://localhost:8080/api/${endpoint}`, data, ...args);
}

const fetchPublic = (endpoint, data, ...args) => {
  return fetchAuth(`public/${endpoint}`, data, ...args);
}

export {
  fetchAuth,
  fetchPublic
}