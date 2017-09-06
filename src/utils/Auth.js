const authToken = () => {
  return localStorage.getItem('auth-token');
}

const isAuth = () => {
  return authToken() !== null;
}

export {
  authToken,
  isAuth
};