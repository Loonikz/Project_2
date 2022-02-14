import "./styles.scss"
import {addListener} from "../../logic/header/utils";
import {changeLng} from "../../logic/header/localization";
import {changeTheme} from "../../logic/header/theme";
import {getLocalStorage} from "../../logic/header/getLocalStorage";

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
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
  addListener('dropdownTheme', 'change', (event) => changeTheme(event));

  getLocalStorage()}

document.addEventListener('DOMContentLoaded', function () {
  init();
});


function getData(url: string) {
  return new Promise<[]>((resolve, reject) => {
    fetch(url, {
      method: 'GET'
    })
      .then((data) => data.json())
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject([])
      });
  });
}
