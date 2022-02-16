import './styles.scss';
import {
  addListener,
  fromLocaleStorageToDropDown,
  getInputValue,
  setStyleDisplay
} from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { changeTabSecurity } from '../../logic/header/changeTabSecurity';
import { changeDB, changeSort, createRecord, loadData, renderFind } from '../../logic/render';

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

  addListener('profile', 'click', setStyleDisplay.bind(null, 'modal-security', 'block'));
  addListener('closed-modal', 'click', setStyleDisplay.bind(null, 'modal-security', 'none'));
  addListener('create', 'click', setStyleDisplay.bind(null, 'modal-create-update', 'block'));
  addListener('update', 'click', setStyleDisplay.bind(null, 'modal-create-update', 'block'));
  addListener(
    'closed-create-update',
    'click',
    setStyleDisplay.bind(null, 'modal-create-update', 'none'),
  );
  getLocalStorage();

  // addListener('profile', 'click', openModalWindow('modal-security'));
  // addListener('closed-modal', 'click', closedModalWindow('modal-security'));

  changeTabSecurity();

  addListener('selectDB', 'change', changeDB.bind(null, state));
  addListener('sort', 'change', changeSort.bind(null, state));
  addListener('search', 'input', renderFind.bind(null, state));
  addListener('save-create', 'click', createRecord);

  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
