const popupEditProfile = document.querySelector('.popup-edit');
const formProfile = popupEditProfile.querySelector('form');
const inputProfileName = formProfile.querySelector('.popup__input_name');
const inputProfileJob = formProfile.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupCreateCard = document.querySelector('.popup-add');
const formCreateCard = popupCreateCard.querySelector('form');
const inputCardTitle = formCreateCard.querySelector('.popup__input_title');
const inputCardImageUrl = formCreateCard.querySelector('.popup__input_path');

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

// закрытие попапов по нажатию на Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

// закрытие попапов по клику на оверлей
function OverlayCloseHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened')
  }
}

// валидация форм
function validatePopupForm(formElement, inputList) {
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, 'popup__input_type_error', 'popup__input-error_active');
  })
  toggleButtonState('button_submit_inactive', inputList, formElement.querySelector('.button_submit'));
}

// открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

// открытие попапа просмотра карточки
function pictureShowHandler(evt) {
  cardImage.src = evt.target.src;
  cardImage.alt = evt.target.alt;
  cardCaption.textContent = evt.target.alt;
  openPopup(popupDisplayCard);
}

// кнопка «Лайк»
function buttonLikeClickHandler(evt) {
  evt.target.classList.toggle('button__like_active');
}

// удаление карточки и слушателей
function buttonDeleteClickHandler(evt) {
  const cardElement = evt.target.closest('.gallery-card');
  evt.target.removeEventListener('click', buttonDeleteClickHandler);
  cardElement.querySelector('.button_like').removeEventListener('click', buttonLikeClickHandler);
  cardElement.querySelector('.gallery-card__picture').removeEventListener('click', pictureShowHandler);
  cardElement.remove();
}

// создание карточки
function createCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const buttonLike = cardElement.querySelector('.button_like');
  const buttonDelete = cardElement.querySelector('.button_delete');
  const picture = cardElement.querySelector('.gallery-card__picture');

  picture.src = link;
  picture.alt = name;
  cardElement.querySelector('.gallery-card__title').textContent = name;


  buttonLike.addEventListener('click', buttonLikeClickHandler);
  buttonDelete.addEventListener('click', buttonDeleteClickHandler);
  picture.addEventListener('click', pictureShowHandler);

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
  validatePopupForm(formProfile, [inputProfileName, inputProfileJob]);
  openPopup(popupEditProfile);
}

// сохранение данных, внесённых пользователем, в форму редактирования профиля
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileJob.textContent = inputProfileJob.value;
  closePopup(popupEditProfile);
}

// открытие попапа добавления карточки
function showPopupCreateCard() {
  formCreateCard.reset();
  validatePopupForm(formCreateCard, [inputCardTitle, inputCardImageUrl]);
  openPopup(popupCreateCard);
}

// добавление новой карточки
function submitFormCreateCard(evt) {
  evt.preventDefault();
  addToGallery(createCard(inputCardTitle.value, inputCardImageUrl.value));
  closePopup(popupCreateCard);
  formCreateCard.reset();
}

document.querySelector('.button_edit').addEventListener('click', showPopupEditProfile);
document.querySelector('.popup-edit__close').addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', submitFormProfile);

document.querySelector('.button_add').addEventListener('click', showPopupCreateCard);
document.querySelector('.popup-add__close').addEventListener('click', () => closePopup(popupCreateCard));
popupCreateCard.addEventListener('submit', submitFormCreateCard);

document.querySelector('.popup-card__close').addEventListener('click', () => closePopup(popupDisplayCard));

popupDisplayCard.addEventListener('click', OverlayCloseHandler);
popupCreateCard.addEventListener('click', OverlayCloseHandler);
popupEditProfile.addEventListener('click', OverlayCloseHandler);

displayInitialCards();
