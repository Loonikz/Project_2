import './styles.scss';
import {
  addListener,
  fromLocaleStorageToDropDown,
  getInputValue,
  setStyleDisplay,
  selectRow,
} from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { changeTabSecurity } from '../../logic/header/changeTabSecurity';
import {
  changeDB,
  changeSort, clearAllRecord,
  createRecord, deleteRecord,
  loadData,
  renderFind,
  updateRecord,
} from '../../logic/render';

function init() {
  const state = {
    mongoDB: [],
    mySQL: [],
    currentRecordId: undefined,
    currentNode: null,
    isUpdate: false,
    setCurrentNode(node: Node): void {
      this.currentNode = node;
    },
    setCurrentRecordId(id: string): void {
      this.currentRecordId = id;
    },
    setIsUpdate(value: boolean): void {
      this.isUpdate = value;
    },
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
  addListener('delete', 'click', setStyleDisplay.bind(null, 'modal-delete', 'block'));
  addListener('closed-modal-delete', 'click', setStyleDisplay.bind(null, 'modal-delete', 'none'));
  addListener('update', 'click', updateRecord.bind(null, state));
  addListener('delete', 'click', deleteRecord.bind(null, state));
  addListener('clear', 'click', clearAllRecord);
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
  addListener('save-create', 'click', createRecord.bind(null, state));
  addListener('table', 'click', selectRow.bind(null, state));

  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
