export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonSubmit = this._popupSelector.querySelector('.button_submit');
    this._handleEscClose =  (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    this._handlerOverlayClose = (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }
    this._setEventListener();
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handlerOverlayClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handlerOverlayClose);

  }

  _setEventListener() {
    this._popupSelector.querySelector('.button_close').addEventListener('click', () => {
      this.close();
    });
  }

  showLoading(text) {
    this._buttonSubmit.textContent = text;
    this._buttonSubmit.classList.add('button_submit_inactive');
  }

  hideLoading(oldText) {
    this._buttonSubmit.textContent = oldText;
    this._buttonSubmit.classList.remove('button_submit_inactive');
  }
}
