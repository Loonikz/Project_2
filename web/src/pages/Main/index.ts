import "./styles.scss"
import {onTheme} from "../../logic/header/theme";

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
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});

