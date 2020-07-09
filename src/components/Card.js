export default class Card {
  constructor(data, cardSelector, myInfo, api, { handleCardClick, handleTrashCanClick }) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._myInfo = myInfo;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleTrashCanClick = handleTrashCanClick;
  }

  _hasMyLike() {
    return this._data.likes.some((person) => { return person._id === this._myInfo.getUserInfo().id; });
  }

  _renderLikes() {
    this._buttonLike.classList.toggle('button__like_active', this._hasMyLike());
    this._element.querySelector('.button_like-counter').textContent = this._data.likes.length;
  }

  _buttonLikeClickHandler() {
    let promise = null;
    if (this._hasMyLike()) {
      promise = this._api.unlikeCard(this._data._id);
    } else {
      promise = this._api.likeCard(this._data._id);
    }

    promise.then((result) => {
      this._data = result;
      this._renderLikes();
    })
    .catch(err => console.log(err))
  }

  _setEventListeners() {
    this._element.querySelector('.button_delete').addEventListener('click', () => {
      this._handleTrashCanClick(this._element);
    });

    this._buttonLike.addEventListener('click', () => {
      this._buttonLikeClickHandler();
    });

    this._element.querySelector('.gallery-card__picture').addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }

  generateCard() {
    this._element = document.querySelector(this._cardSelector).content.querySelector('.gallery-card').cloneNode(true);
    this._buttonLike = this._element.querySelector('.button_like');
    this._setEventListeners();

    const picture = this._element.querySelector('.gallery-card__picture');
    picture.src = this._data.link;
    picture.alt = this._data.name;

    this._element.querySelector('.gallery-card__title').textContent = this._data.name;
    this._renderLikes();

    if (this._data.owner._id === this._myInfo.getUserInfo().id) {
      this._element.querySelector('.button_delete').style.display = 'block';
    }

    return this._element;
  }
}
