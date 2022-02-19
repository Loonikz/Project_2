import './styles.scss';
import { changeTheme } from '../../logic/header/theme';
import { addListener, fromLocaleStorageToDropDown } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { loginValidate, passwordValidate } from '../Main/validation';
import { loginIn } from './logic';

function init() {
  const state = {
    baseURL: 'https://wannaworkinginwizarddev.herokuapp.com',
  };
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();

  addListener('login-btn', 'click', loginIn.bind(null, state));
  addListener('login-reg', 'input', loginValidate.bind(null, 'login-reg'));
  addListener('password-reg', 'input', passwordValidate.bind(null, 'password-reg'));

  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
