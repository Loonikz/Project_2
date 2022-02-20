import {
  setInnerText,
  collectData,
} from '../../logic/header/utils';
import { sendData } from '../../logic/request';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../Main/validation';

export function sendRegister(state): boolean {
  if (
    loginValidate('sign-up-login') === false ||
    passwordValidate('sign-up-password') === false ||
    confirmPasswordValidate('sign-up-password', 'sign-up-password-confirm') === false
  ) {
    return false;
  }

  const data = collectData();
  sendData(`${state.baseURL}/auth/registration`, data).then((response: Response) => {
    if (response.status === 200) {
      window.location.href = response.url;
    } else if (response.status === 400) {
      setInnerText('sign-up-login-message', 'This login already in use');
    }
  }).catch((err) => console.log(err));
  return true;
  // postRegister(state.urlRegister, data)
}
