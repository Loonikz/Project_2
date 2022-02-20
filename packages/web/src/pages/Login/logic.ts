import {
  setInnerText,
  collectDataLogin
} from '../../logic/header/utils';
import { sendData } from '../../logic/request';
import { loginValidate, passwordValidate } from '../Main/validation';
import i18next from 'i18next';

export function loginIn(state): boolean {
  if (loginValidate('login-reg') === false || passwordValidate('password-reg') === false) {
    return false;
  }
  const data = collectDataLogin();
  sendData(`${state.baseURL}/auth/login`, data).then((response: Response) => {
    if (response.status === 200) {
      window.location.href = response.url;
    } else if (response.status === 400) {
      setInnerText('password-reg-message', i18next.t('error_wrong_pass_login'))
    }
  }).catch((err) => console.log(err));
  });
  return true;
}
