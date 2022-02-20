import '../../style/login-register.scss';
import { addListener, fromLocaleStorageToDropDown } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import {
  sendRegister,
} from './logic';
import { confirmPasswordValidate, passwordValidate, loginValidate } from '../Main/validation';

export function init() {
  const state = {
    baseURL: 'https://wannaworkinginwizarddev.herokuapp.com',
  };
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();

  addListener('registration-btn', 'click', sendRegister.bind(null, state));
  addListener('sign-up-login', 'input', loginValidate.bind(null, 'sign-up-login'));
  addListener('sign-up-password', 'input', passwordValidate.bind(null, 'sign-up-password'));
  addListener(
    'sign-up-password-confirm',
    'change',
    confirmPasswordValidate.bind(null, 'sign-up-password', 'sign-up-password-confirm'),
  );

  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
