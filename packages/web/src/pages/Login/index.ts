import './styles.scss';
import { changeTheme } from '../../logic/header/theme';
import { addListener, fromLocaleStorageToDropDown } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { inputLoginValidation, inputPasswordValidation, loginIn } from './logic';

function init() {
  const state = {
    urlLogin: 'https://wannaworkinginwizarddev.herokuapp.com/auth/login',
    validateStatus: [false, false],
  };
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();

  addListener('login-reg', 'input', inputLoginValidation.bind(null, state));
  addListener('password-reg', 'input', inputPasswordValidation.bind(null, state));
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);
  addListener('login-btn', 'click', loginIn.bind(null, state));

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
