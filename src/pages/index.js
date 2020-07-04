import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWhithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  popupEditProfile,
  formProfile,
  inputProfileName,
  inputProfileJob,
  profileName,
  profileJob,
  profileAvatar,
  popupChangeAvatar,
  formChangeAvatar,
  popupCreateCard,
  formCreateCard,
  popupDisplayCard,
  popupDeleteCard,
  galleryContainer,
  formSettings,
} from "../utils/constants.js"

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  authToken: '4ae18a0d-219b-4b69-acec-20d1c5775e6d',
});

const formProfileValidator = new FormValidator(formSettings, formProfile);

const formCreateCardValidator = new FormValidator(formSettings, formCreateCard);

const formChangeAvatarValidator = new FormValidator(formSettings, formChangeAvatar);

const popupWithImage = new PopupWhithImage(popupDisplayCard);

const popupDelete = new PopupWithConfirmation(popupDeleteCard);

const userInfo = new UserInfo({
  api: api,
  elementName: profileName,
  elementAbout: profileJob,
  elementAvatar: profileAvatar
});

function renderCard(item) {
  const card = new Card(item, '.card-template', userInfo, api, {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    handleTrashCanClick: () => {
      popupDelete.open(item._id);
    }
  });
  cardList.addItem(card.generateCard());
}

// отображение карточек на странице
const cardList = new Section({ api: api, renderer: renderCard }, galleryContainer);
popupDelete.setOnConfirm((cardId) => {
  return cardList.deleteCard(cardId);
});

// форма редактирования профиля
const addPopupEditProfile = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (item) => {
    return userInfo.setUserInfo(item);
  }
});

// форма редактирования аватара
const createPopupChangeAvatar = new PopupWithForm(popupChangeAvatar, {
  handleFormSubmit: (item) => {
    return userInfo.changeAvatar(item);
  }
});

document.querySelector('.profile__picture_edit').addEventListener('click', () => {
  formChangeAvatarValidator.errorClean();
  createPopupChangeAvatar.open();
})

// форма добавления карточек пользователем
const addPopupCreateCard = new PopupWithForm(popupCreateCard, {
  handleFormSubmit: (formData) => {
    return cardList.createCard(formData.title, formData.path);
  }
});

document.querySelector('.button_add').addEventListener('click', () => {
  formCreateCardValidator.errorClean();
  addPopupCreateCard.open();
})

document.querySelector('.button_edit').addEventListener('click', () => {
  const authorInfo = userInfo.getUserInfo()
  inputProfileName.value = authorInfo.name;
  inputProfileJob.value = authorInfo.job;
  formProfileValidator.errorClean();
  addPopupEditProfile.open();
});

formProfileValidator.enableValidation();
formCreateCardValidator.enableValidation();
formChangeAvatarValidator.enableValidation();

