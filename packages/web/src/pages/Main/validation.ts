import {
  getElementById,
  getInputValue,
  removeDisabledAttribute,
  setDisabledAttribute,
  setInnerText,
} from '../../logic/header/utils';

export function validationName(state, id, index) {
  const value = getInputValue(id);
  state.validateStatus[index] = value.length >= 3;
  if (!state.validateStatus[index]) {
    setInnerText(`${id}-message`, 'Min length 3 letters!');
  } else {
    setInnerText(`${id}-message`, '');
  }
}

export function validationAge(state) {
  const value = getInputValue('age');
  state.validateStatus[2] = (value.length <= 3 && value !== '0') || value === '';
  if (!state.validateStatus[2]) {
    setInnerText(`age-message`, 'Min length 3 letters and value not equal 0!');
  } else {
    setInnerText(`age-message`, '');
  }
}

export function validationCity(state) {
  const value = getInputValue('city');
  state.validateStatus[3] = (value.length >= 3 && value.match(/^[a-zA-Zа-яА-я]*$/)) || value === '';
  if (!state.validateStatus[3]) {
    setInnerText(`city-message`, 'Min length 3 letters and value contains only letters!');
  } else {
    setInnerText(`city-message`, '');
  }
}

export function validationPhone(state) {
  const value = getInputValue('number');
  const regPhone =
    /((380|\+380|0)?)[ .-]?[(]?(39|50|63|66|67|68|91|92|93|94|95|96|97|98|99|31|32|33|34|35|36|37|38|41|42|43|44|46|47|48|49|51|52|53|54|55|56|57|58|59|61|62|64|65|69)[)]?[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}/;
  state.validateStatus[4] = value.match(regPhone) || value === '';
  if (!state.validateStatus[4]) {
    setInnerText(`number-message`, 'Insert phone number!');
  } else {
    setInnerText(`number-message`, '');
  }
}

export function validationEmail(state) {
  const value = getInputValue('email');
  const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  state.validateStatus[5] = value.match(regEmail) || value === '';
  if (!state.validateStatus[5]) {
    setInnerText(`email-message`, 'Insert email number!');
  } else {
    setInnerText(`email-message`, '');
  }
}

export function validationCompany(state) {
  const value = getInputValue('company');
  state.validateStatus[6] = value.length >= 3 || value === '';
  if (!state.validateStatus[6]) {
    setInnerText(`company-message`, 'Min length 3 letters!');
  } else {
    setInnerText(`company-message`, '');
  }
}

export function checkValidation(state): boolean {
  validationName(state, 'first-name', 0);
  validationName(state, 'last-name', 1);
  validationAge(state);
  validationCity(state);
  validationCompany(state);
  validationEmail(state);
  validationPhone(state);
  return state.validateStatus.reduce((acc, status) => acc && status, true);
}

export function loginValidate(idLogin) {
  const loginRegex = /^[a-zA-Z0-9_]*$/;
  const value: string = getInputValue('new-login');
  if (value.length >= 6 && value.length <= 20 && value.match(loginRegex)) {
    setInnerText(`${idLogin}-message`, '');
    return true;
  }
  setInnerText(
    `${idLogin}-message`,
    'Login may be contain only letters, numbers, and underscores. Login at least 6 characters',
  );
  return false;
}

export function passwordValidate(idPass) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).*$/;
  const value: string = getInputValue(idPass);
  if (value.length >= 8 && value.match(passwordRegex)) {
    setInnerText(`${idPass}-message`, '');
    return true;
  }
  setInnerText(
    `${idPass}-message`,
    'Password must contain letters, numbers, and special symbols. Password at least 8 characters',
  );
  return false;
}

export function confirmPasswordValidate(idPass, idConfirmPass) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).*$/;
  const valuePassword = getInputValue(idPass);
  const valueConfirmPassword = getInputValue(idConfirmPass);
  if (
    valueConfirmPassword === valuePassword &&
    valueConfirmPassword.length >= 8 &&
    valueConfirmPassword.match(passwordRegex)
  ) {
    setInnerText(`${idConfirmPass}-message`, '');
    return true;
  }
  setInnerText(`${idConfirmPass}-message`, 'Passwords does`t match');
  return false;
}
