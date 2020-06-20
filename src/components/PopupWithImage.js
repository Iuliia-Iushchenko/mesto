import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const cardImage = document.querySelector('.popup__image');
    cardImage.src = link;
    cardImage.alt = name;
    document.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}
