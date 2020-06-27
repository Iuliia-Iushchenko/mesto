import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  _setEventListener() {
    super._setEventListener();
    this._submitForm = this._handleSubmitForm.bind(this);
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._submitForm);

  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
  }
}
