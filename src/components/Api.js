export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _sendRequest(method, route, body) {
    return fetch(this._baseUrl + route, {
      method: method,
      headers: {
        'Authorization': this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
        console.log('api.js ok'); //проверка
        return res.json();
      }
      console.log('api.js reject'); //проверка
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._sendRequest('GET', '/users/me');
  }

  setUserInfo(name, about) {
    return this._sendRequest('PATCH', '/users/me', { name, about });
  }

  changeAvatar(avatar) {
    return this._sendRequest('PATCH', '/users/me/avatar', { avatar });
  }

  getInitialCards() {
    return this._sendRequest('GET', '/cards');
  }

  createCard(name, link) {
    return this._sendRequest('POST', '/cards', { name, link });
  }

  deleteCard(cardId) {
    return this._sendRequest('DELETE', `/cards/${cardId}`);
  }

  likeCard(cardId) {
    return this._sendRequest('PUT', `/cards/likes/${cardId}`);
  }

  unlikeCard(cardId) {
    return this._sendRequest('DELETE', `/cards/likes/${cardId}`);
  }
}
