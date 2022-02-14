import "./styles.scss"
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";
import {changeTheme} from "../../logic/header/theme";
import {getLocalStorage} from "../../logic/header/getLocalStorage";
import {
  confirmPasswordValidate,
  loginValidate,
  passwordValidate,
  validateStatusCheck
} from "./logic";

function init() {
  const state = {
    urlRegister: '/register',
    validateStatus: [false, false, false],
  };

  addListener('sign-up-login', 'input', () => {
    loginValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });

  addListener('sign-up-password', 'input', () => {
    passwordValidate.call(null, state);
    confirmPasswordValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });

  addListener('sign-up-password-confirm', 'change', () => {
    confirmPasswordValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });

  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
  addListener('dropdownTheme', 'change', (event) => changeTheme(event));

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
