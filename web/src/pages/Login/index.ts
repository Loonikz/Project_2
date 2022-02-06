import "./styles.scss"
import {onTheme} from "../../logic/header/theme";
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";

function init() {
  onTheme();
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});

