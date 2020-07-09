export default class UserInfo {
  constructor({api, elementName, elementAbout, elementAvatar}) {
    this._api = api;
    this._elementName = elementName;
    this._elementAbout = elementAbout;
    this._elementAvatar = elementAvatar;

    this._data = null;
    this._handleResponse(this._api.getUserInfo());
  }

  _handleResponse(promise) {
    return promise.then((result) => {
      this._data = result;
      this._elementName.textContent = this._data.name;
      this._elementAbout.textContent = this._data.about;
      this._elementAvatar.src = this._data.avatar;
    })
  }

  getUserInfo() {
    return {
      id: this._data._id,
      name: this._data.name,
      job: this._data.about,
    }
  }

  setUserInfo(data) {
    return this._handleResponse(this._api.setUserInfo(data.name, data.job));
  }

  changeAvatar(data) {
    return this._handleResponse(this._api.changeAvatar(data.link));
  }
}
