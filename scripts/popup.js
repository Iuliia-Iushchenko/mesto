const buttonEdit = document.querySelector('.button_edit');
const buttonClosePopupEdit = document.querySelector('.popup-edit__close');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup-edit');
let popupAdd = document.querySelector('.popup-add');
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

formElement.addEventListener('submit', formSubmitHandler);

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

initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.gallery-card__picture').src = item.link;
  cardElement.querySelector('.gallery-card__title').textContent = item.name;

  cardElement.querySelector('.button_like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('song__like_active');
  })

  galleryContainer.append(cardElement);
});

//buttonCreate.addEventListener('click', function () {
//  addCard(titleInput.value, pathInput.value);
//});
