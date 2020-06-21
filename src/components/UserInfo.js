import { inputProfileName, inputProfileJob } from "../utils/constants.js"

export default class UserInfo {
  constructor({userName, userJob}) {
    this._userName = userName;
    this._userJob = userJob;
    this._inputProfileName = inputProfileName;
    this._inputProfileJob = inputProfileJob;
  }

  getUserInfo() {
    this._inputProfileName.value = this._userName.textContent;
    this._inputProfileJob.value = this._userJob.textContent;
  }

  setUserInfo() {
    this._userName.textContent = this._inputProfileName.value;
    this._userJob.textContent = this._inputProfileJob.value;
  }
}
