import './styles.scss';
import { changeTheme } from '../../logic/header/theme';
import { addListener } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { loginIn, loginValidation, passwordValidation, validateStatusCheck } from './logic';
import { sendRegister } from '../Register/logic';

function init() {
  const state = {
    urlLogin: 'http://localhost:3000/auth/login',
    validateStatus: [false, false],
  };

  addListener('login-reg', 'input', () => {
    loginValidation.call(null, state);
    validateStatusCheck.call(null, state);
  });
  addListener('password-reg', 'input', () => {
    passwordValidation.call(null, state);
    validateStatusCheck.call(null, state);
  });
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
  addListener('dropdownTheme', 'change', (event) => changeTheme(event));
  addListener('login-btn', 'click', loginIn.bind(null, state));

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
