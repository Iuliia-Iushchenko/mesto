const popupEditProfile = document.querySelector('.popup-edit');
const formProfile = popupEditProfile.querySelector('form');
const inputProfileName = formProfile.querySelector('.popup__item_name');
const inputProfileJob = formProfile.querySelector('.popup__item_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupCreateCard = document.querySelector('.popup-add');
const formCreateCard = popupCreateCard.querySelector('form');
const inputCardTitle = formCreateCard.querySelector('.popup__item_title');
const inputCardImageUrl = formCreateCard.querySelector('.popup__item_path');

const popupDisplayCard = document.querySelector('.popup-card');
const cardImage = popupDisplayCard.querySelector('.popup__image');
const cardCaption = popupDisplayCard.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#card-template');
const galleryContainer = document.querySelector('.gallery');

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

// открытые/закрытие попапов
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
};

// открытие попапа просмотра карточки
function pictureShowkHandler(evt) {
  cardImage.src = evt.target.src;
  cardImage.alt = evt.target.alt;
  cardCaption.textContent = evt.target.alt;
  togglePopup(popupDisplayCard);
}

// кнопка «Лайк»
function buttonLikeClickHandler(evt) {
  evt.target.classList.toggle('button__like_active');
}

// удаление карточки и слушателей
function buttonDeleteClickHandler(evt) {
  evt.target.removeEventListener('click', buttonLikeClickHandler);
  evt.target.removeEventListener('click', buttonDeleteClickHandler);
  evt.target.removeEventListener('click', pictureShowkHandler);
  evt.target.closest('.gallery-card').remove();
}

// создание карточки
function createCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const buttonLike = cardElement.querySelector('.button_like');
  const buttonDelete = cardElement.querySelector('.button_delete');
  const picture = cardElement.querySelector('.gallery-card__picture');

  cardElement.querySelector('.gallery-card__picture').src = link;
  cardElement.querySelector('.gallery-card__picture').alt = name;
  cardElement.querySelector('.gallery-card__title').textContent = name;


  buttonLike.addEventListener('click', buttonLikeClickHandler);
  buttonDelete.addEventListener('click', buttonDeleteClickHandler);
  picture.addEventListener('click', pictureShowkHandler);

  return cardElement;
}

function addToGallery(card) {
  galleryContainer.prepend(card);
}

// отображение карточек на странице
function displayInitialCards() {
  initialCards.forEach(({name, link}) => addToGallery(createCard(name, link)));
}

// открытие попапа редактирования профиля
function showPopupEditProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  togglePopup(popupEditProfile);
}

// сохранение данных, внесённых пользователем, в форму редактирования профиля
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  togglePopup(popupEditProfile);
}

// открытие попапа добавления карточки
function showPopupCreateCard() {
  formCreateCard.reset();
  togglePopup(popupCreateCard);
}

// добавление новой карточки
function submitFormCreateCard(evt) {
  evt.preventDefault();
  addToGallery(createCard(inputCardTitle.value, inputCardImageUrl.value));
  togglePopup(popupCreateCard);
  formCreateCard.reset();
}

document.querySelector('.button_edit').addEventListener('click', showPopupEditProfile);
document.querySelector('.popup-edit__close').addEventListener('click', () => togglePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', submitFormProfile);

document.querySelector('.button_add').addEventListener('click', showPopupCreateCard);
document.querySelector('.popup-add__close').addEventListener('click', () => togglePopup(popupCreateCard));
popupCreateCard.addEventListener('submit', submitFormCreateCard);

document.querySelector('.popup-card__close').addEventListener('click', () => togglePopup(popupDisplayCard));

displayInitialCards();
