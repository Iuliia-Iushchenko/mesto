import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWhithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  popupEditProfile,
  formProfile,
  inputProfileName,
  inputProfileJob,
  profileName,
  profileJob,
  popupCreateCard,
  formCreateCard,
  popupDisplayCard,
  galleryContainer,
  initialCards
} from "../utils/constants.js"

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

function errorClean(form) {
  form.querySelectorAll('.popup__input-error').forEach((span) => {
    span.classList.remove('popup__input-error_active');
    span.textContent = '';
  });
  form.querySelectorAll('.popup__input').forEach((input) => {
    input.classList.remove('popup__input_type_error');
  })
}

const popupWithImage = new PopupWhithImage(popupDisplayCard);

function rendererCardList(item) {
  const card = new Card(item, '.card-template',
  {handleCardClick: () => {
    popupWithImage.open(item.name, item.link);
  }
});
  cardList.addItem(card.generateCard());
}

// отображение карточек на странице
const cardList = new Section({
  data: initialCards,
  renderer: ((item) => {
    rendererCardList(item);
  })
}, galleryContainer);

const userInfo = new UserInfo();

// форма редактирования профиля
const addPopupEditProfile = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: () => {
    userInfo.setUserInfo();
  }
});

// форма добавления карточек пользователем
const addPopupCreateCard = new PopupWithForm(popupCreateCard, {
  handleFormSubmit: (formData) => {
    const item = { name: formData.title, link: formData.path };
    rendererCardList(item);
  }
});

cardList.renderItems();

userInfo.getUserInfo();

document.querySelector('.button_edit').addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  formProfile.querySelector('.button_submit').classList.remove('button_submit_inactive');
  errorClean(formProfile);
  addPopupEditProfile.open();
});

document.querySelector('.button_add').addEventListener('click', () => {
  formCreateCard.querySelector('.button_submit').classList.add('button_submit_inactive');
  errorClean(formCreateCard);
  addPopupCreateCard.open();
})

formValidation();
