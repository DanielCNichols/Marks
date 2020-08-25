import config from '../config';
import TokenService from './tokenService';

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postLogin(login) {
    return fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(login),
    }).then(res =>
      !res.ok ? res.json().then(err => Promise.reject(err)) : res.json()
    );
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  postMemberLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/membersAuth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then(res =>
      !res.ok ? res.json().then(err => Promise.reject(err)) : res.json()
    );
  },
  refreshMemberToken() {
    return fetch(`${config.API_ENDPOINT}/membersAuth/token`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
