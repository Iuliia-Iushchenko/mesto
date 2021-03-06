import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText =  this._popupSelector.querySelector('.button_submit').textContent;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this.showLoading('Сохранение...');
    this._handleFormSubmit(this._getInputValues())
    .then(() => this.close())
    .catch(err => console.log(err))
    .finally(() => this.hideLoading(this._buttonText));
  }

  _setEventListener() {
    super._setEventListener();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {this._handleSubmitForm(evt)}
    );
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
  }
}
