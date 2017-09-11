import { authToken, isAuth } from '../utils/Auth';

const fetchEndpoint = (endpoint, ...args) => fetch(`http://localhost:8080/api/${endpoint}`, ...args);

const fetchAuth = (endpoint, data, ...args) => {
  data = data || {};
  if (isAuth()) {
    data.headers = data.headers || new Headers();
    data.headers.set('X-AUTH-TOKEN', authToken());
  }
  return fetchEndpoint(endpoint, data, ...args);
};

const fetchPublic = (endpoint, ...args) => {
  return fetchEndpoint(`public/${endpoint}`, ...args);
};

export {
  fetchAuth,
  fetchPublic
}