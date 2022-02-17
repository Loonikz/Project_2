import './styles.scss';
import { addListener, fromLocaleStorageToDropDown } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import {
  inputLoginValidation,
  inputPasswordConfirmValidation,
  inputPasswordValidation,
} from './logic';

function init() {
  const state = { urlRegister: '/register', validateStatus: [false, false, false] };
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();

  addListener('sign-up-login', 'input', inputLoginValidation.bind(null, state));
  addListener('sign-up-password', 'input', inputPasswordValidation.bind(null, state));
  addListener(
    'sign-up-password-confirm',
    'change',
    inputPasswordConfirmValidation.bind(null, state),
  );

  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
