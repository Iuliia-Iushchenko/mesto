const buttonEdit = document.querySelector('.button_edit');
const buttonClosePopupEdit = document.querySelector('.popup-edit__close');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup-add');
let popupPhoto = document.querySelector('.popup-photo');
let buttonSubmit = document.querySelector('.button_submit');
let nameInput = document.querySelector('.popup__item_name');
let jobInput = document.querySelector('.popup__item_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let buttonAdd = document.querySelector('.button_add');
let titleInput = document.querySelector('.popup__item_title');
let pathInput = document.querySelector('.popup__item_path');
let buttonCreate = document.querySelector('.button_create');
let galleryContainer = document.querySelector('.gallery');


function popupOpened(popup) {
  popup.classList.add('popup_opened');
};

buttonEdit.addEventListener('click', function() {
  popupOpened(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonAdd.addEventListener('click', function() {
  popupOpened(popupAdd);
});

function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

buttonClosePopupEdit.addEventListener('click', function() {
  popupClose(popupEdit);
  nameInput.value = "";
  jobInput.value = "";
});

buttonClosePopupAdd.addEventListener('click', function() {
  popupClose(popupAdd);
  titleInput.value = "";
  pathInput.value = "";
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
};

popupEdit.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function newCard (name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.gallery-card__picture').src = link;
  cardElement.querySelector('.gallery-card__title').textContent = name;

  cardElement.querySelector('.button_like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button__like_active');
  });

  cardElement.querySelector('.button_delite').addEventListener('click', function (evt) {
    const eventTarget = evt.target.closest('.gallery-card');
    eventTarget.remove();
});

  return cardElement;
};

initialCards.forEach(function (item) {
  galleryContainer.append(newCard(item.name, item.link));
});

function photoAddFormSubmitHandler (evt) {
  evt.preventDefault();
  galleryContainer.prepend(newCard(titleInput.value, pathInput.value));
  popupAdd.classList.remove('popup_opened');
};

popupAdd.addEventListener('submit', photoAddFormSubmitHandler);
