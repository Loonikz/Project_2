import './styles.scss';
import { changeTheme } from '../../logic/header/theme';
import { addListener } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { inputLoginValidation, inputPasswordValidation } from './logic';

function init() {
  const state = {
    url: '/login',
    validateStatus: [false, false],
  };

  addListener('login-reg', 'input', inputLoginValidation.bind(null, state));
  addListener('password-reg', 'input', inputPasswordValidation.bind(null, state));
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
