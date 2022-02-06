import "./styles.scss"
import {onTheme} from "../../logic/header/theme";
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";

const profile = document.getElementById('profile');
const modalSecurity = document.getElementById('modal-security');
const closedModal = document.getElementById('closed-modal');

profile.addEventListener('click', () => {
  modalSecurity.style.display = "block";
});

closedModal.addEventListener('click', () => {
  modalSecurity.style.display = "none";
});

function init() {
  onTheme();
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});

