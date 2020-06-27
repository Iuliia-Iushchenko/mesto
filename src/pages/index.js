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
  formSettings,
  initialCards
} from "../utils/constants.js"

const formProfileValidator = new FormValidator(formSettings, formProfile);

const formCreateCardValidator = new FormValidator(formSettings, formCreateCard);

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
  data: initialCards.reverse(),
  renderer: ((item) => {
    rendererCardList(item);
  })
}, galleryContainer);

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileJob
});

// форма редактирования профиля
const addPopupEditProfile = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
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

document.querySelector('.button_add').addEventListener('click', () => {
  formCreateCardValidator.errorCline();
  addPopupCreateCard.open();
})

document.querySelector('.button_edit').addEventListener('click', () => {
  const autorInfo = userInfo.getUserInfo();
  inputProfileName.value = autorInfo.name;
  inputProfileJob.value = autorInfo.job;
  formProfileValidator.errorCline();
  addPopupEditProfile.open();
});

formProfileValidator.enableValidation();
formCreateCardValidator.enableValidation();
