import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(name, link) {
    const cardImage = this._popupSelector.querySelector('.popup__image');
    cardImage.src = link;
    cardImage.alt = name;
    this._popupSelector.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}
