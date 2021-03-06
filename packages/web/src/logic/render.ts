import { Person } from './type';
import { getData, sendData } from './request';
import {
  getElementById,
  getInputValue,
  getValueLocalStorage,
  setDisabledAttribute,
  setNodeValue,
  setStyleDisplay,
  setValueLocalStorage,
} from './header/utils';
import { checkValidation } from '../pages/Main/validation';
import { closeCreateModal } from '../pages/Main/modal';

export function renderCell(value: string, attribute: string) {
  const th = document.createElement('th');
  th.setAttribute('class', 'container__content__data--items-body');
  th.setAttribute('data-label', attribute);
  th.innerHTML = value === '' || value === null ? '.' : value;
  return th;
}

export function renderRow(arrayData: Array<Person>) {
  const fragment = document.createDocumentFragment();
  arrayData.forEach((row: Person) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'container__content__data--tr');
    tr.append(renderCell(String(row.id), 'Id'));
    tr.append(renderCell(row.fname, 'First name'));
    tr.append(renderCell(row.lname, 'Last name'));
    tr.append(renderCell(row.age, 'Age'));
    tr.append(renderCell(row.city, 'City'));
    tr.append(renderCell(row.phoneNumber, 'Mob. number'));
    tr.append(renderCell(row.email, 'Email'));
    tr.append(renderCell(row.companyName, 'Company'));
    fragment.append(tr);
  });
  const table = <HTMLTableElement>getElementById('table');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  const tbody = document.createElement('tbody');
  tbody.append(fragment);
  table.append(tbody);
}

export function renderTable(db: string, state) {
  const stateObj = state;
  getData(`${state.baseURL}/${db}`)
    .then((data) => {
      renderRow(data);
      if (db.toLowerCase() === 'mysql') {
        stateObj.mySQL = data;
      } else {
        stateObj.mongoDB = data;
      }
      setDisabledAttribute(getElementById('update'));
      setDisabledAttribute(getElementById('delete'));
    })
    .catch(() => {
      console.log('err');
    });
}

export function loadData(state) {
  const localStorage = getValueLocalStorage('DB');
  if (!localStorage) {
    setValueLocalStorage('DB', 'mysql');
  }
  renderTable(localStorage || 'mysql', state);
}

export function changeDB(state) {
  setValueLocalStorage('DB', getInputValue('selectDB'));
  loadData(state);
}

export function sort(arrayData: [], field) {
  if (field === 'id') {
    return arrayData.sort((a, b) => (Number(a[field]) > Number(b[field]) ? 1 : -1));
  }
  return arrayData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
}

export function activeArray(state): [] {
  if (getInputValue('selectDB') === 'MySQL') {
    return state.mySQL;
  }
  return state.mongoDB;
}

export function changeSort(state) {
  const sortField = getInputValue('sort');
  const arrayData = activeArray(state);
  if (sortField === 'first name') {
    renderRow(sort(arrayData, 'fname'));
  } else if (sortField === 'last name') {
    renderRow(sort(arrayData, 'lname'));
  } else {
    renderRow(sort(arrayData, sortField));
  }
}

export function find(arrayData: Array<Person>, searchField): Array<Person> {
  return arrayData.filter((value: Person) => {
    const isFirstName = value.fname.toLowerCase().indexOf(searchField.toLowerCase()) !== -1;
    const isLastName = value.lname.toLowerCase().indexOf(searchField.toLowerCase()) !== -1;
    return isFirstName || isLastName;
  });
}

export function renderFind(state) {
  const searchField = getInputValue('search');
  if (getInputValue('selectDB') === 'MySQL') {
    renderRow(find(state.mySQL, searchField));
  } else {
    renderRow(find(state.mongoDB, searchField));
  }
}

export function createRecord(state) {
  if (checkValidation(state)) {
    const person: Person = {
      id: state.currentRecordId,
      phoneNumber: getInputValue('number'),
      fname: getInputValue('first-name'),
      lname: getInputValue('last-name'),
      age: getInputValue('age'),
      email: getInputValue('email'),
      companyName: getInputValue('company'),
      city: getInputValue('city'),
    };
    const db = getInputValue('selectDB');
    let userMethod = 'POST';
    if (state.isUpdate) {
      userMethod = 'PUT';
    }
    sendData(`${state.baseURL}/${db}`, person, userMethod).then(() => {
      closeCreateModal();
      renderTable(db, state);
    });
  }
}

export function updateRecord(state) {
  if (state.currentRecordId) {
    state.setIsUpdate(true);
    let record: Person;
    if (getInputValue('selectDB') === 'MySQL') {
      record = state.mySQL.find((person: Person) => String(person.id) === state.currentRecordId);
    } else {
      record = state.mongoDB.find((person: Person) => String(person.id) === state.currentRecordId);
    }
    setNodeValue('number', record.phoneNumber);
    setNodeValue('first-name', record.fname);
    setNodeValue('last-name', record.lname);
    setNodeValue('age', record.age);
    setNodeValue('email', record.email);
    setNodeValue('company', record.companyName);
    setNodeValue('city', record.city);
    setStyleDisplay('modal-create-update', 'block');
    checkValidation(state);
  }
}

export function clearAllRecord(state) {
  const db = getInputValue('selectDB');
  sendData(`${state.baseURL}/${db}/clear`, {}, 'DELETE').then(() => {
    renderTable(db, state);
  });
}

export function deleteRecord(state) {
  if (state.isDelete) {
    if (state.currentRecordId) {
      const db = getInputValue('selectDB');
      sendData(`${state.baseURL}/${db}/${state.currentRecordId}`, {}, 'DELETE').then(() => {
        renderTable(db, state);
      });
    }
  } else {
    clearAllRecord(state);
  }
  setStyleDisplay('modal-delete', 'none');
}
