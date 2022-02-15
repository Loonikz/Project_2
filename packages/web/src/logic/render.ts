import { person } from './type';
import { getData } from './request';

function renderCell(value: string) {
  const th = document.createElement('th');
  th.setAttribute('class', 'container__data--items-body');
  th.innerHTML = value;
  return th;
}

function renderRow(arrayData: []) {
  const fragment = document.createDocumentFragment();
  arrayData.forEach((row: person, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'container__data--tr');
    tr.append(renderCell(String(index + 1)));
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

export function renderTable(db: string) {
  getData(`http://localhost:3000/${db}`).then((data) => {
    renderRow(data);
  });
}
