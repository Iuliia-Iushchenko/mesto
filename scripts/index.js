import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
    document.removeEventListener('keydown', keyHandler);
  }
}

// закрытие попапов по клику на оверлей
function OverlayCloseHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened')
  }
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

function formValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((form) => {
    const formValidator = new FormValidator ({
      inputSelector: '.popup__input',
      submitButtonSelector: '.button_submit',
      inactiveButtonClass: 'button_submit_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    }, form);
    formValidator.enableValidation();
  });
}

// Очистка ошибок
function errorClean(form) {
  form.querySelectorAll('.popup__input-error').forEach((span) => {
    span.classList.remove('popup__input-error_active');
    span.textContent = '';
  });
  form.querySelectorAll('.popup__input').forEach((input) => {
    input.classList.remove('popup__input_type_error');
  })
}

// открытие попапа редактирования профиля
function showPopupEditProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  formValidation();
  errorClean(formProfile);
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
  errorClean(formCreateCard);
  openPopup(popupCreateCard);
}

// добавление новой карточки
function submitFormCreateCard(evt) {
  evt.preventDefault();
  const newUserCard = {};
  newUserCard.name = inputCardTitle.value;
  newUserCard.link = inputCardImageUrl.value;
  const card = new Card(newUserCard, '.card-template');
  galleryContainer.prepend(card.generateCard());
  closePopup(popupCreateCard);
  formCreateCard.reset();
}

// отображение карточек на странице
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  galleryContainer.prepend(card.generateCard());
});

document.querySelector('.button_edit').addEventListener('click', showPopupEditProfile);
document.querySelector('.popup-edit__close').addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', submitFormProfile);

document.querySelector('.button_add').addEventListener('click', showPopupCreateCard);
document.querySelector('.popup-add__close').addEventListener('click', () => closePopup(popupCreateCard));
popupCreateCard.addEventListener('submit', submitFormCreateCard);

popupCreateCard.addEventListener('click', OverlayCloseHandler);
popupEditProfile.addEventListener('click', OverlayCloseHandler);

formValidation();
