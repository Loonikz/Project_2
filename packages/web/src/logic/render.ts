import { Person } from './type';
import { getData } from './request';
import { getInputValue, getValueLocalStorage, setValueLocalStorage } from './header/utils';

function renderCell(value: string) {
  const th = document.createElement('th');
  th.setAttribute('class', 'container__data--items-body');
  th.innerHTML = value;
  return th;
}

function renderRow(arrayData: Array<Person>) {
  const fragment = document.createDocumentFragment();
  arrayData.forEach((row: Person) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'container__data--tr');
    tr.append(renderCell(String(row.id)));
    tr.append(renderCell(row.fname));
    tr.append(renderCell(row.lname));
    tr.append(renderCell(row.age));
    tr.append(renderCell(row.city));
    tr.append(renderCell(row.phoneNumber));
    tr.append(renderCell(row.email));
    tr.append(renderCell(row.companyName));
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
