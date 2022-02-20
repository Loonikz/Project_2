import { expand } from 'dotenv-expand';

const {
  renderTable,
  renderFind,
  updateRecord,
  find,
  createRecord,
  deleteRecord,
  loadData,
  clearAllRecord,
  changeDB,
  changeSort,
  sort,
  renderCell,
  renderRow,
} = require('../render');

describe('renderCell', () => {
  test('renderCell', () => {
    expect(renderCell('hi', '').outerHTML).toEqual(
      '<th class="container__content__data--items-body" data-label="">hi</th>',
    );
  });
});

describe('renderRow', () => {
  test('renderRow', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ rows: { length: 0 } };
    });
    expect(renderRow([])).toBeUndefined();
  })
})
