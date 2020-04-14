const buttonEdit = document.querySelector('.button_edit');
const buttonClose = document.querySelector('.button_close');
let popup = document.querySelector('.popup');
let buttonSubmit = document.querySelector('.button_submit');
let nameInput = document.querySelector('.popup__item_name');
let jobInput = document.querySelector('.popup__item_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');


function popupOpened() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

buttonEdit.addEventListener('click', popupOpened);

function popupClose() {
  popup.classList.remove('popup_opened');
  nameInput.value = "";
  jobInput.value = "";
};

buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler);
