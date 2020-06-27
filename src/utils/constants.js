export const popupEditProfile = document.querySelector('.popup-edit');
export const formProfile = popupEditProfile.querySelector('form');
export const inputProfileName = formProfile.querySelector('.popup__input_name');
export const inputProfileJob = formProfile.querySelector('.popup__input_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const popupCreateCard = document.querySelector('.popup-add');
export const formCreateCard = popupCreateCard.querySelector('form');

export const popupDisplayCard = document.querySelector('.popup-card');

export const galleryContainer = '.gallery';

export const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const initialCards = [
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
