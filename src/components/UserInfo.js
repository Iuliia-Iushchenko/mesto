import { profileName, profileJob, inputProfileName, inputProfileJob } from "../utils/constants.js"

export default class UserInfo {
  constructor(autor = {}) {
    this._name = autor.name;
    this._job = autor.job;
  }

  getUserInfo() {
    this._name = profileName.textContent;
    this._job = profileJob.textContent;
  }

  setUserInfo() {
    this._name = inputProfileName.value;
    this._job = inputProfileJob.value;
    profileName.textContent = this._name;
    profileJob.textContent = this._job;
  }
}
