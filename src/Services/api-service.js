import config from '../config';
import TokenService from './tokenService';

const ApiService = {
  getBookmarks() {
    return fetch(`${config.API_ENDPOINT}/bookmarks`, {
      headers: {
        'content-type': 'application/json',
        Authorization: TokenService.getAuthToken(),
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  postBookmark(newBookmark) {
    return fetch(`${config.API_ENDPOINT}/bookmarks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBookmark),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  editBookmark(id, newBookmark) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newBookmark),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deleteBookmark(id) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : undefined
    );
  },
};

export default ApiService;
