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
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handlerOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
    this.close();
    }
  }

  _setEventListener() {
    document.addEventListener('click', evt => this._handlerOverlayClose(evt));
    this._popupSelector.querySelector('.button_close').addEventListener('click', () => {
      this.close();
    });
  }
}
