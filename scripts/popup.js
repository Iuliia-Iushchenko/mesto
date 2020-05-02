const buttonEdit = document.querySelector('.button_edit');
const buttonClosePopupEdit = document.querySelector('.popup-edit__close');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
const buttonClosePopupPhoto = document.querySelector('.popup-photo__close');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const buttonSubmit = document.querySelector('.button_submit');
const nameInput = document.querySelector('.popup__item_name');
const jobInput = document.querySelector('.popup__item_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');
const buttonAdd = document.querySelector('.button_add');
const titleInput = document.querySelector('.popup__item_title');
const pathInput = document.querySelector('.popup__item_path');
const buttonCreate = document.querySelector('.button_create');
const galleryContainer = document.querySelector('.gallery');
const photoImage = document.querySelector('.popup-photo__image');
const photoCaption = document.querySelector('.popup-photo__caption');
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

//открытые/закрытие попапов
function popupOpenedClosed(popup) {
  popup.classList.toggle('popup_opened');
};

//клонирование карточки
function newCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.gallery-card__picture').src = link;
  cardElement.querySelector('.gallery-card__picture').alt = name;
  cardElement.querySelector('.gallery-card__title').textContent = name;


  //включение/выключение лайков
  cardElement.querySelector('.button_like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button__like_active');
  });

  //удаление карточки
  cardElement.querySelector('.button_delete').addEventListener('click', function (evt) {
    const eventTarget = evt.target.closest('.gallery-card');
    eventTarget.remove();
  });

  //открытие попапа увеличения фотографии из карточки
  cardElement.querySelector('.gallery-card__picture').addEventListener('click', function (evt) {
    popupOpenedClosed(popupPhoto);
    photoImage.src = evt.target.src;
    photoImage.alt = name;
    photoCaption.textContent = name;
  });

  return cardElement;
};

//отображение карточек на странице
initialCards.forEach(function(item) {
  galleryContainer.append(newCard(item.name, item.link));
});


//открытие попапа редактирования профиля
buttonEdit.addEventListener('click', function() {
  popupOpenedClosed(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//закрытие попапа редактирования профиля, очистка полей
buttonClosePopupEdit.addEventListener('click', function() {
  popupOpenedClosed(popupEdit);
  nameInput.value = "";
  jobInput.value = "";
});

//сохраниение данных, внессеных пользователем, в форму реадактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupOpenedClosed(popupEdit);
};

popupEdit.addEventListener('submit', formSubmitHandler);

//открытие попапа добавления карточки
buttonAdd.addEventListener('click', () => popupOpenedClosed(popupAdd));

//закрытие попапа добавления карточки, очистка полей
buttonClosePopupAdd.addEventListener('click', function() {
  popupOpenedClosed(popupAdd);
  titleInput.value = "";
  pathInput.value = "";
});

//добавление новой карточки
function photoAddFormSubmitHandler (evt) {
  evt.preventDefault();
  galleryContainer.prepend(newCard(titleInput.value, pathInput.value));
  popupAdd.classList.remove('popup_opened');
};

popupAdd.addEventListener('submit', photoAddFormSubmitHandler);

//закрытие попапа увеличения фотографии
buttonClosePopupPhoto.addEventListener('click', () => popupOpenedClosed(popupPhoto));
