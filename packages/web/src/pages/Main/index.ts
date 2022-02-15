import './styles.scss';
import { addListener } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { changeDB, changeSort, loadData } from '../../logic/render';

const profile = document.getElementById('profile');
const modalSecurity = document.getElementById('modal-security');
const closedModal = document.getElementById('closed-modal');

profile.addEventListener('click', () => {
  modalSecurity.style.display = 'block';
});

closedModal.addEventListener('click', () => {
  modalSecurity.style.display = 'none';
});

function init() {
  const state = {
    mongoDB: [],
    mySQL: [],
  };
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);
  addListener('selectDB', 'change', changeDB.bind(null, state));
  addListener('sort', 'change', changeSort.bind(null, state));

  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
