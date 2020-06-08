const popupDisplayCard = document.querySelector('.popup-card');

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _keyHandler(evt) {
    if (evt.key === 'Escape') {
      popupDisplayCard.classList.remove('popup_opened');
    }
  }

  _overlayCloseHandler(evt) {
    if (evt.target.classList.contains('popup')) {
      evt.target.classList.remove('popup_opened')
    }
  }

  _buttonLikeClickHandler(evt) {
    this._element.querySelector('.button_like').classList.toggle('button__like_active');
    }

  _buttonDeleteClickHandler() {
    this._element.remove();
  }

  _pictureShowHandler() {
    const cardImage = document.querySelector('.popup__image');
     cardImage.src = this._link;
     cardImage.alt = this._name;
     document.querySelector('.popup__caption').textContent = this._name;
     popupDisplayCard.classList.add('popup_opened');
     document.addEventListener('keydown', this._keyHandler);
     popupDisplayCard.addEventListener('click', this._overlayCloseHandler);
  }

  _pictureCloseHandler() {
    popupDisplayCard.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keyHandler);
    popupDisplayCard.removeEventListener('click', this._overlayCloseHandler);
  }

  _setEventListeners() {
    this._element.querySelector('.button_delete').addEventListener('click', () => {
      this._buttonDeleteClickHandler();
    });

    this._element.querySelector('.button_like').addEventListener('click', () => {
      this._buttonLikeClickHandler();
    });

    this._element.querySelector('.gallery-card__picture').addEventListener('click', () => {
      this._pictureShowHandler();
    });

    document.querySelector('.popup-card__close').addEventListener('click', () => {
      this._pictureCloseHandler();
    });
  }

  generateCard() {
    this._element = document.querySelector(this._cardSelector).content.querySelector('.gallery-card').cloneNode(true);
    this._setEventListeners();

    const picture = this._element.querySelector('.gallery-card__picture');

    picture.src = this._link;
    picture.alt = this._name;
    this._element.querySelector('.gallery-card__title').textContent = this._name;

    return this._element;
  }
}
