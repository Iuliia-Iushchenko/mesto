export default class Section {
  constructor({ api, renderer }, containerSelector) {
    this._api = api;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._items = null;
    this._fetchCards();
  }

  _fetchCards() {
    this._api.getInitialCards()
      .then((result) => {
        this._items = result.sort(function (item1, item2) { return Date.parse(item1.createdAt) - Date.parse(item2.createdAt); });
        this._items.forEach(item => {
          this._renderer(item);
        });
      })
      .catch(err => console.log(err))
   }

  createCard(title, path) {
    return this._api.createCard(title, path)
      .then((result) => {
        this._renderer(result);
      })
      .catch(err => console.log(err))
  }

  deleteCard(id, element) {
    return this._api.deleteCard(id)
      .then(() => {
        element.remove();
      })
      .catch(err => console.log(err));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
