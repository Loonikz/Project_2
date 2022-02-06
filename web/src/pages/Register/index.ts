import "./styles.scss"
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";
import {changeTheme} from "../../logic/header/theme";
import {getLocalStorage} from "../../logic/header/getLocalStorage";

function init() {
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
  addListener('dropdownTheme', 'change', (event) => changeTheme(event));

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
