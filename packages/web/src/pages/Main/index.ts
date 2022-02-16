import './styles.scss';
import { addListener, fromLocaleStorageToDropDown, getInputValue } from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { changeTabSecurity } from '../../logic/header/changeTabSecurity';
import { changeDB, changeSort, loadData, renderFind } from '../../logic/render';

const modalSecurity = document.getElementById('modal-security');
const btnProfile = document.getElementById('profile');
const closedModal = document.getElementById('closed-modal');
const create = document.getElementById('create');
const update = document.getElementById('update');
const modalCreateUpdate = document.getElementById('modal-create-update');
const closedCreateModal = document.getElementById('closed-create-update');

btnProfile.addEventListener('click', () => {
  modalSecurity.style.display = 'block';
});
closedModal.addEventListener('click', () => {
  modalSecurity.style.display = 'none';
});
create.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'block';
});
create.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'block';
});
update.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'block';
});
closedCreateModal.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'none';
});

function init() {
  const state = {
    mongoDB: [],
    mySQL: [],
  };
  fromLocaleStorageToDropDown('selectDB', 'DB', ['MySQL', 'MongoDB']);
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();

  // addListener('profile', 'click', openModalWindow('modal-security'));
  // addListener('closed-modal', 'click', closedModalWindow('modal-security'));

  changeTabSecurity();

  addListener('selectDB', 'change', changeDB.bind(null, state));
  addListener('sort', 'change', changeSort.bind(null, state));
  addListener('search', 'input', renderFind.bind(null, state));

  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
