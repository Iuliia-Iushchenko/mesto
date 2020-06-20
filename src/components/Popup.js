export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose =  (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }

  open() {
    this._setEventListener();
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.addEventListener('click', this._handlerOverlayClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('click', this._handlerOverlayClose);
  }

  _handlerOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      evt.target.classList.remove('popup_opened');
    }
  }

  _setEventListener() {
    this._popupSelector.querySelector('.button_close').addEventListener('click', () => {
      this.close();
    });
  }
}
