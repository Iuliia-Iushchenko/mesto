import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonText = this._popupSelector.querySelector('.button_submit').textContent;
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setOnConfirm(callback) {
      this._popupSelector.querySelector('.button_create').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.showLoading('Удаление...');
      callback(this._data)
      .then(() => this.close())
      .catch(err => console.log(err))
      .finally(() => this.hideLoading(this._buttonText));
    });
  }
}
