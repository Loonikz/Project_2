import '../../style/main.scss';
import {
  addListener,
  fromLocaleStorageToDropDown,
  setStyleDisplay,
  selectRow,
} from '../../logic/header/utils';
import { changeLng } from '../../logic/header/localization';
import { changeTheme } from '../../logic/header/theme';
import { getLocalStorage } from '../../logic/header/getLocalStorage';
import { changeTabSecurity } from '../../logic/header/changeTabSecurity';
import {
  changeDB,
  changeSort,
  clearAllRecord,
  createRecord,
  deleteRecord,
  loadData,
  renderFind,
  updateRecord,
} from '../../logic/render';
import {
  checkValidation,
  confirmPasswordValidate,
  loginValidate,
  passwordValidate,
  validationAge,
  validationCity,
  validationCompany,
  validationEmail,
  validationName,
  validationPhone,
} from './validation';
import { closeCreateModal, closeSecurity } from './modal';
import { changeLogin, changePassword, clickClear, clickDelete, logout } from './logic';

export function init() {
  const state = {
    baseURL: 'https://wannaworkinginwizarddev.herokuapp.com',
    mongoDB: [],
    mySQL: [],
    currentRecordId: undefined,
    currentNode: null,
    isUpdate: false,
    isDelete: false,
    validateStatus: [false, false, true, true, true, true, true],
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
  state.setCurrentNode(null);
  state.setIsUpdate(false);
  state.setCurrentRecordId(undefined);
  // drop down
  fromLocaleStorageToDropDown('selectDB', 'DB', ['MySQL', 'MongoDB']);
  fromLocaleStorageToDropDown('changeTheme', 'theme', ['light', 'dark']);
  fromLocaleStorageToDropDown('changeLanguage', 'lang', ['en', 'ru']);
  changeLng();
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  addListener('profile', 'click', setStyleDisplay.bind(null, 'modal-security', 'block'));
  addListener('closed-modal', 'click', closeSecurity);
  addListener('cancel', 'click', closeSecurity);
  addListener('cancelS', 'click', closeSecurity);

  addListener('create', 'click', setStyleDisplay.bind(null, 'modal-create-update', 'block'));
  addListener('delete', 'click', clickDelete.bind(null, state));
  addListener('clear', 'click', clickClear.bind(null, state));
  addListener('closed-modal-delete', 'click', setStyleDisplay.bind(null, 'modal-delete', 'none'));
  addListener('closeDelete', 'click', setStyleDisplay.bind(null, 'modal-delete', 'none'));

  addListener('update', 'click', updateRecord.bind(null, state));
  addListener('deleteRecord', 'click', deleteRecord.bind(null, state));
  addListener('logout', 'click', logout.bind(null, state));
  addListener('closed-create-update', 'click', closeCreateModal);
  addListener('cancel-create', 'click', closeCreateModal);

  getLocalStorage();
  changeTabSecurity();

  addListener('selectDB', 'change', changeDB.bind(null, state));
  addListener('sort', 'change', changeSort.bind(null, state));
  addListener('search', 'input', renderFind.bind(null, state));
  addListener('save-create', 'click', createRecord.bind(null, state));
  addListener('table', 'click', selectRow.bind(null, state));
  // validation
  addListener('first-name', 'input', checkValidation.bind(null, state));
  addListener('last-name', 'input', checkValidation.bind(null, state));
  addListener('age', 'input', checkValidation.bind(null, state));
  addListener('city', 'input', checkValidation.bind(null, state));
  addListener('number', 'input', checkValidation.bind(null, state));
  addListener('email', 'input', checkValidation.bind(null, state));
  addListener('company', 'input', checkValidation.bind(null, state));
  // security
  addListener('changeLogin', 'click', changeLogin.bind(null, state));
  addListener('new-login', 'input', loginValidate.bind(null, 'new-login'));
  addListener('password', 'input', passwordValidate.bind(null, 'password'));
  addListener('confirm-password', 'input', confirmPasswordValidate.bind(null, 'confirm-password'));

  addListener('changePassword', 'click', changePassword.bind(null, state));
  addListener('new-pass', 'input', passwordValidate.bind(null, 'new-pass'));
  addListener('new-password', 'input', passwordValidate.bind(null, 'new-password'));
  addListener(
    'confirm-pass-edit',
    'input',
    confirmPasswordValidate.bind(null, 'confirm-pass-edit'),
  );
  getLocalStorage();
  loadData(state);
}

document.addEventListener('DOMContentLoaded', init);
