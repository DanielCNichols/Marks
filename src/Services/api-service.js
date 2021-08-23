import config from '../config';
import TokenService from './tokenService';

const ApiService = {
  getBookmarks() {
    return fetch(`${config.API_ENDPOINT}/bookmarks`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postBookmark(bookmark) {
    return fetch(`${config.API_ENDPOINT}/bookmarks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ bookmark }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  editBookmark(id, updated) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ updated }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteBookmark(id) {
    return fetch(`${config.API_ENDPOINT}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : undefined
    );
  },
};

export default ApiService;
