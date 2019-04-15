import { authHeader } from '../_helpers';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({ username, password }),
  };

  return fetch(`https://bt3103-lighthouse.firebaseio.com/users/${username}.json`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // if (user.token) {
      if (password === user.password) {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }

      return Promise.reject('Wrong password');
    });
}

export const userService = {
  login,
  logout,
};
