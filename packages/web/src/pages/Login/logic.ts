import {
  setInnerText,
  collectDataLogin
} from '../../logic/header/utils';
import { sendData } from '../../logic/request';
import { loginValidate, passwordValidate } from '../Main/validation';

// export function loginValidation(state) {
//   const stateObj = state;
//   const loginRegex = /^[a-zA-Z0-9_]{3,20}$/;
//   const value = <string>getInputValue('login-reg');
//   const loginId = 'login-message';
//
//   if (value === '') {
//     setInnerText(loginId, 'Field can`t be empty');
//     stateObj.validateStatus[0] = false;
//     return false;
//   }
//
//   if (value.length < 6) {
//     setInnerText(loginId, 'Login at least 6 characters');
//     stateObj.validateStatus[0] = false;
//     return false;
//   }
//
//   if (value.length > 20) {
//     setInnerText(loginId, 'Login can`t be longer than 20 characters');
//     stateObj.validateStatus[0] = false;
//     return false;
//   }
//
//   if (!value.match(loginRegex)) {
//     setInnerText(loginId, 'Login must contain only letters, numbers, and underscores');
//     stateObj.validateStatus[0] = false;
//     return false;
//   }
//
//   setInnerText(loginId, '');
//   stateObj.validateStatus[0] = true;
//   return true;
// }
//
// export function passwordValidation(state) {
//   const stateObj = state;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
//   const value = <string>getInputValue('password-reg');
//   const passwordId = 'password-message';
//
//   if (value === '') {
//     setInnerText(passwordId, 'Field can`t be empty');
//     stateObj.validateStatus[1] = false;
//     return false;
//   }
//
//   if (value.length < 8) {
//     setInnerText(passwordId, 'Password at least 8 characters');
//     stateObj.validateStatus[1] = false;
//     return false;
//   }
//
//   if (!value.match(passwordRegex)) {
//     setInnerText(passwordId, 'Password must contain letters, numbers, and special symbols');
//     stateObj.validateStatus[1] = false;
//     return false;
//   }
//
//   setInnerText(passwordId, '');
//   stateObj.validateStatus[1] = true;
//   return true;
// }
//
// export function validateStatusCheck(state): boolean {
//   const button = <HTMLElement>getElementById('login-btn');
//   if (state.validateStatus.includes(false)) {
//     if (!button.hasAttribute('disabled')) {
//       button.setAttribute('disabled', 'disabled');
//     }
//     return false;
//   }
//   button.removeAttribute('disabled');
//   return true;
// }

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
      setInnerText('password-message','Wrong login or password')
    }
  });
  return true;
}
