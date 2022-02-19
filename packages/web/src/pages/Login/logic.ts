import {
  setInnerText,
  collectDataLogin
} from '../../logic/header/utils';
import { sendData } from '../../logic/request';
import { loginValidate, passwordValidate } from '../Main/validation';

export function loginIn(state): boolean {
  if (loginValidate('login-reg') === false || passwordValidate('password-reg') === false) {
    return false;
  }
  const data = collectDataLogin('login-form');
  console.log(data)
  sendData(`${state.baseURL}/auth/login`, data).then((response: Response) => {
    if (response.status === 200) {
      window.location.href = response.url;
    } else if (response.status === 400) {
      setInnerText('password-reg-message','Wrong login or password')
    }
  });
  return true;
}
