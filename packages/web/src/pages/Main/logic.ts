import { sendData } from '../../logic/request';
import { confirmPasswordValidate, loginValidate, passwordValidate } from './validation';
import { getInputValue, setHref, setInnerText, setStyleDisplay } from '../../logic/header/utils';
import { closeSecurity } from './modal';

export function logout(state) {
  sendData(`${state.baseURL}/auth/logout`, {})
    .then(() => {
      setHref('/login');
    })
    .catch((err) => {
      console.log(err);
    });
}

export function changeLogin(state) {
  if (
    loginValidate('new-login') &&
    passwordValidate('password') &&
    confirmPasswordValidate('password', 'confirm-password')
  ) {
    sendData(`${state.baseURL}/auth/changeLogin`, {
      username: getInputValue('new-login'),
      password: getInputValue('password'),
    }).then((response: Response) => {
      if (response.status === 200) {
        setInnerText('change-login-message', '');
        closeSecurity();
      } else if (response.status === 418) {
        setInnerText('change-login-message', 'Пользователь с таким именем уже существует');
      } else if (response.status === 419) {
        setInnerText('change-login-message', 'Неверный пароль');
      } else if (response.status === 500) {
        setInnerText('change-login-message', 'Попробуйте позже');
      }
    });
  }
}

export function changePassword(state) {
  if (
    passwordValidate('new-pass') &&
    passwordValidate('new-password') &&
    confirmPasswordValidate('new-password', 'confirm-pass-edit')
  ) {
    sendData(`${state.baseURL}/auth/changePassword`, {
      password: getInputValue('new-pass'),
      newPassword: getInputValue('new-password'),
    }).then((response: Response) => {
      if (response.status === 200) {
        setInnerText('change-password-message', '');
        closeSecurity();
      } else if (response.status === 418) {
        setInnerText('change-password-message', 'Пользователь с таким именем уже существует');
      } else if (response.status === 419) {
        setInnerText('change-password-message', 'Неверный пароль');
      } else if (response.status === 500) {
        setInnerText('change-password-message', 'Попробуйте позже');
      }
    });
  }
}
