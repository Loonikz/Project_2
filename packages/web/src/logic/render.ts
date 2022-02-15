import { person } from './type';
import { getData } from './request';
import { getInputValue, getValueLocalStorage, setValueLocalStorage } from './header/utils';

function renderCell(value: string) {
  const th = document.createElement('th');
  th.setAttribute('class', 'container__data--items-body');
  th.innerHTML = value;
  return th;
}

function renderRow(arrayData: []) {
  const fragment = document.createDocumentFragment();
  arrayData.forEach((row: person) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'container__data--tr');
    tr.append(renderCell(String(row.id)));
    tr.append(renderCell(row.fname));
    tr.append(renderCell(row.lname));
    tr.append(renderCell(row.age));
    tr.append(renderCell(row.city));
    tr.append(renderCell(row.number));
    tr.append(renderCell(row.email));
    tr.append(renderCell(row.company));
    fragment.append(tr);
  });
  const table = <HTMLTableElement>document.querySelector('.container__data--table');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  table.append(fragment);
}

export function renderTable(db: string, state) {
  const stateObj = state;
  getData(`http://localhost:3000/${db}`).then((data) => {
    renderRow(data);
    if (db.toLowerCase() === 'mysql') {
      stateObj.mySQL = data;
    } else {
      stateObj.mongoDB = data;
    }
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
  return arrayData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
}

function activeArray(state): [] {
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
