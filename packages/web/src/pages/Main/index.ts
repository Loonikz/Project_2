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
import { inputLoginValidation } from '../Register/logic';
import {
  validationAge,
  validationCity, validationCompany,
  validationEmail,
  validationName,
  validationPhone
} from './validation';
import { closeCreateModal } from './modal'
import { sendData } from '../../logic/request';

function init() {
  const state = {
    baseURL: 'https://wannaworkinginwizarddev.herokuapp.com',
    mongoDB: [],
    mySQL: [],
    currentRecordId: undefined,
    currentNode: null,
    isUpdate: false,
    validateStatus: [],
    setCurrentNode(node: Node): void {
      this.currentNode = node;
    },
    setCurrentRecordId(id: string | undefined): void {
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
  addListener('deleteRecord', 'click', deleteRecord.bind(null, state));
  addListener('clear', 'click', clearAllRecord.bind(null, state));
  addListener('logout', 'click', () => {
    sendData(`${state.baseURL}/auth/logout`, {}).then(()=>{
      window.location.href='/login';
    }).catch(()=>{
      console.log('err')
    })
  });
  addListener('closed-create-update', 'click', closeCreateModal);
  getLocalStorage();

  // addListener('profile', 'click', openModalWindow('modal-security'));
  // addListener('closed-modal', 'click', closedModalWindow('modal-security'));

  changeTabSecurity();

  addListener('selectDB', 'change', changeDB.bind(null, state));
  addListener('sort', 'change', changeSort.bind(null, state));
  addListener('search', 'input', renderFind.bind(null, state));
  addListener('save-create', 'click', createRecord.bind(null, state));
  addListener('table', 'click', selectRow.bind(null, state));

  addListener('first-name', 'input', validationName.bind(null, state, 'first-name', 0));
  addListener('last-name', 'input', validationName.bind(null, state, 'last-name', 1));
  addListener('age', 'input', validationAge.bind(null, state));
  addListener('city', 'input', validationCity.bind(null, state));
  addListener('number', 'input', validationPhone.bind(null, state));
  addListener('email', 'input', validationEmail.bind(null, state));
  addListener('company', 'input', validationCompany.bind(null, state));

  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
