import './styles.scss';
import { addListener, fromLocaleStorageToDropDown } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import {
  confirmPasswordValidate,
  loginValidate,
  passwordValidate, sendRegister,
  validateStatusCheck,
} from './logic';

function init() {
  const state = {
    urlRegister: 'http://localhost:3000/auth/registration',
    validateStatus: [false, false, false] };
  addListener('sign-up-login', 'input', () => {
    loginValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });
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

  addListener('registration-btn', 'click', sendRegister.bind(null, state));

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
