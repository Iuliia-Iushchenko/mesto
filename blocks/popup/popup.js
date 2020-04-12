let buttonEdit = document.querySelector('.button__edit');
let buttonClose = document.querySelector('.button__close');
let popupOpened = document.querySelector('.popup_opened');
let buttonSubmit = document.querySelector('.button__submit');


buttonEdit.addEventListener('click', function () {
    popupOpened.style.display = "flex";
});

buttonClose.addEventListener('click', function () {
  popupOpened.style.display = "none";
});

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__item_name');
    let jobInput = document.querySelector('.popup__item_job');
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupOpened.style.display = "none";
};

formElement.addEventListener('submit', formSubmitHandler);
