// отображение ошибок
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// скрытие ошибок
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// проверка поля ввода на валидность
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inactiveButtonClass, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (validationSettings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(validationSettings.inactiveButtonClass, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass);
      toggleButtonState(validationSettings.inactiveButtonClass, inputList, buttonElement);
    })
  })
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(validationSettings, formElement);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
