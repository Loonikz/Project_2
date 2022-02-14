import {
  getInputValue,
  getElementById,
  setInnerText,
  hasAttribute,
  setDisabledAttribute,
  removeDisabledAttribute
} from "../../logic/header/utils"

export function loginValidate(state): boolean {
  const loginRegex = /^[a-zA-Z0-9_]*$/;
  const value = <string>getInputValue('sign-up-login');
  const loginErrorId = 'login-message';

  if (value === '') {
    setInnerText(loginErrorId, 'Field can`t be empty');
    state.validateStatus[0] = false;
    return false;
  }

  if (!value.match(loginRegex)) {
    setInnerText(loginErrorId, 'Login may be contain only letters, numbers, and underscores');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length < 6) {
    setInnerText(loginErrorId, 'Login at least 6 characters');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length > 20) {
    setInnerText(loginErrorId, 'Login can`t be longer than 20 characters');
    state.validateStatus[0] = false;
    return false;
  }

  setInnerText(loginErrorId, '');
  state.validateStatus[0] = true;
  return true;
}

export function passwordValidate(state): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).*$/;
  const value = <string>getInputValue('sign-up-password');
  const passwordErrorId = 'password-message';

  if (value === '') {
    setInnerText(passwordErrorId, 'Field can`t be empty');
    state.validateStatus[1] = false;
    return false;
  }

  if (value.length < 8) {
    setInnerText(passwordErrorId, 'Password at least 8 characters');
    state.validateStatus[1] = false;
    return false;
  }

  if (!value.match(passwordRegex)) {
    setInnerText(
      'password-message',
      'Password must contain letters, numbers, and special symbols',
    );
    state.validateStatus[1] = false;
    return false;
  }

  setInnerText(passwordErrorId, '');
  state.validateStatus[1] = true;
  return true;
}

export function confirmPasswordValidate(state): boolean {
  const valuePassword = <string>getInputValue('sign-up-password');
  const valueConfirmPassword = <string>getInputValue('sign-up-password-confirm');
  const confirmPasswordErrorId = 'password-confirm-message';

  if (valuePassword === '') {
    setInnerText(confirmPasswordErrorId, 'Field can`t be empty');
    state.validateStatus[1] = false;
    return false;
  }
  console.log(valuePassword)
  console.log(valueConfirmPassword)
  console.log(valueConfirmPassword !== valuePassword)
  if (valueConfirmPassword !== valuePassword) {
    setInnerText(confirmPasswordErrorId, 'Passwords does`t match');
    state.validateStatus[2] = false;
    return false;
  }

  setInnerText(confirmPasswordErrorId, '');
  state.validateStatus[2] = true;
  return true;
}

export function validateStatusCheck(state): boolean {
  const button = <HTMLElement>getElementById('registration-btn');
  if (state.validateStatus.includes(false)) {
    if (!hasAttribute(button, 'disabled')) {
      setDisabledAttribute(button);
    }
    return false;
  }
  removeDisabledAttribute(button);
  return true;
}
