import "./styles.scss"
import {changeTheme} from "../../logic/header/theme";
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";
import {getLocalStorage} from "../../logic/header/getLocalStorage";
import {loginValidation, passwordValidation, validateStatusCheck} from "./logic";

function init() {
  const state = {
    url: '/login',
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

  getLocalStorage()
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
