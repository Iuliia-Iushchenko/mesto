export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _buttonLikeClickHandler(evt) {
    this._element.querySelector('.button_like').classList.toggle('button__like_active');
    }

  _buttonDeleteClickHandler() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.button_delete').addEventListener('click', () => {
      this._buttonDeleteClickHandler();
    });

    this._element.querySelector('.button_like').addEventListener('click', () => {
      this._buttonLikeClickHandler();
    });

    this._element.querySelector('.gallery-card__picture').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
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
