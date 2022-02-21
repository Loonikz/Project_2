import { expand } from 'dotenv-expand';
import { checkValidation } from '../../pages/Main/validation';

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
  activeArray,
} = require('../render');

const validation = require('../../pages/Main/validation');

const state = {
  baseURL: 'http://localhost:3000',
  mongoDB: [
    {
      id: 4,
      phoneNumber: '',
      fname: 'Юлия',
      lname: 'Лихацкая',
      age: '25',
      email: '',
      companyName: '',
      city: 'Харьков',
    },
    {
      id: 1,
      phoneNumber: '',
      fname: 'Юлия',
      lname: 'Лихацкая',
      age: '25',
      email: '',
      companyName: '',
      city: 'Киев',
    },
  ],
  mySQL: [
    {
      id: 4,
      phoneNumber: '',
      fname: 'Юлия',
      lname: 'Лихацкая',
      age: '25',
      email: '',
      companyName: '',
      city: 'Харьков',
    },
    {
      id: 1,
      phoneNumber: '',
      fname: 'Юлия',
      lname: 'Лихацкая',
      age: '25',
      email: '',
      companyName: '',
      city: 'Киев',
    },
  ],
  currentRecordId: '4',
  currentNode: null,
  isUpdate: false,
  validateStatus: [],
  setCurrentNode(node) {
    this.currentNode = node;
  },
  setCurrentRecordId(id) {
    this.currentRecordId = id;
  },
  setIsUpdate(value) {
    this.isUpdate = value;
  },
};

describe('renderCell', () => {
  test('renderCell', () => {
    expect(renderCell('hi', '').outerHTML).toEqual(
      '<th class="container__content__data--items-body" data-label="">hi</th>',
    );
  });
});

describe('renderRow', () => {
  test('renderRow', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(renderRow([])).toBeUndefined();
  });
  test('renderRow 1 record', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          rows: { length: 0 },
          append: () => {},
          setAttribute: () => {},
        }),
    );
    expect(
      renderRow([
        {
          id: 4,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Донецк',
        },
        {
          id: 4,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Донецк',
        },
      ]),
    ).toBeUndefined();
  });
});

describe('renderTable', () => {
  test('renderTable', () => {
    expect(renderTable('', state)).toBeUndefined();
  });
  test('renderTable then', () => {
    global.fetch = jest.fn(() => <Promise<Response>>(<unknown>Promise.resolve({ json: () => [] })));
    expect(renderTable('', state)).toBeUndefined();
  });
  test('renderTable then mysql', () => {
    global.fetch = jest.fn(() => <Promise<Response>>(<unknown>Promise.resolve({ json: () => [] })));
    expect(renderTable('mysql', state)).toBeUndefined();
  });
  test('renderTable then node null', () => {
    global.fetch = jest.fn(() => <Promise<Response>>(<unknown>Promise.resolve({ json: () => [] })));
    expect(renderTable('mysql', state)).toBeUndefined();
  });
});

describe('loadData', () => {
  test('loadData', () => {
    expect(loadData(state)).toBeUndefined();
  });
});

describe('changeDB', () => {
  test('changeDB', () => {
    expect(changeDB(state)).toBeUndefined();
  });
});

describe('sort', () => {
  test('sort', () => {
    expect(
      sort(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Донецк',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Донецк',
          },
        ],
        'id',
      ),
    ).toEqual([
      {
        id: 1,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Донецк',
      },
      {
        id: 4,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Донецк',
      },
    ]);
  });
  test('sort city', () => {
    expect(
      sort(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        'city',
      ),
    ).toEqual([
      {
        id: 1,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Киев',
      },
      {
        id: 4,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Харьков',
      },
    ]);
  });
  test('sort phoneNumber', () => {
    expect(
      sort(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 5,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        'id',
      ),
    ).toEqual([
      {
        id: 4,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Харьков',
      },
      {
        id: 5,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Киев',
      },
    ]);
  });
  test('sort phoneNumber', () => {
    expect(
      sort(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 5,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '26',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        'age',
      ),
    ).toEqual([
      {
        id: 4,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Харьков',
      },
      {
        id: 5,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '26',
        email: '',
        companyName: '',
        city: 'Киев',
      },
    ]);
  });
});

describe('activeArray', () => {
  test('activeArray', () => {
    expect(activeArray(state)).toEqual([]);
  });
  test('activeArray', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'MySQL',
        }),
    );
    expect(activeArray(state)).toEqual([]);
  });
});

describe('changeSort', () => {
  test('changeSort', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'first name',
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(changeSort(state)).toBeUndefined();
  });
  test('changeSort', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'last name',
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(changeSort(state)).toBeUndefined();
  });
  test('changeSort', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'id',
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(changeSort(state)).toBeUndefined();
  });
});

describe('find', () => {
  test('find', () => {
    expect(
      find(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Донецк',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Донецк',
          },
        ],
        'Юлия',
      ),
    ).toEqual([
      {
        id: 4,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Донецк',
      },
      {
        id: 1,
        phoneNumber: '',
        fname: 'Юлия',
        lname: 'Лихацкая',
        age: '25',
        email: '',
        companyName: '',
        city: 'Донецк',
      },
    ]);
  });
  test('find city', () => {
    expect(
      find(
        [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        'city',
      ),
    ).toEqual([]);
  });
});

describe('renderFind', () => {
  test('renderFind', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'id',
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(renderFind(state)).toBeUndefined();
  });
  test('renderFind', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'MySQL',
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(renderFind(state)).toBeUndefined();
  });
});

describe('createRecord', () => {
  test('createRecord', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          value: 'MySQL',
          setAttribute: () => {},
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(createRecord(state)).toBeUndefined();
  });
  test('createRecord', () => {
    validation.checkValidation = jest.fn(() => true);
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          style: { display: '' },
          value: 'MySQL',
          setAttribute: () => {},
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(createRecord(state)).toBeUndefined();
  });
  test('createRecord', () => {
    state.setIsUpdate(true);
    validation.checkValidation = jest.fn(() => true);
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          style: { display: '' },
          value: 'MySQL',
          setAttribute: () => {},
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(createRecord(state)).toBeUndefined();
  });
});

describe('updateRecord', () => {
  test('updateRecord', () => {
    expect(
      updateRecord({
        baseURL: 'http://localhost:3000',
        mongoDB: [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        mySQL: [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        currentRecordId: '4',
        currentNode: null,
        isUpdate: false,
        validateStatus: [],
        setCurrentNode(node) {
          this.currentNode = node;
        },
        setCurrentRecordId(id) {
          this.currentRecordId = id;
        },
        setIsUpdate(value) {
          this.isUpdate = value;
        },
      }),
    ).toBeUndefined();
  });
  test('updateRecord', () => {
    global.document.getElementById = jest.fn(
      () => <HTMLElement>(<unknown>{
          style: { display: '' },
          value: '',
          setAttribute: () => {},
          rows: {
            length: 2,
          },
          append: () => {},
          deleteRow() {
            this.rows.length = 0;
          },
        }),
    );
    expect(
      updateRecord({
        baseURL: 'http://localhost:3000',
        mongoDB: [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        mySQL: [
          {
            id: 4,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Харьков',
          },
          {
            id: 1,
            phoneNumber: '',
            fname: 'Юлия',
            lname: 'Лихацкая',
            age: '25',
            email: '',
            companyName: '',
            city: 'Киев',
          },
        ],
        currentRecordId: '4',
        currentNode: null,
        isUpdate: false,
        validateStatus: [],
        setCurrentNode(node) {
          this.currentNode = node;
        },
        setCurrentRecordId(id) {
          this.currentRecordId = id;
        },
        setIsUpdate(value) {
          this.isUpdate = value;
        },
      }),
    ).toBeUndefined();
  });
});

describe('clearAllRecord', () => {
  test('clearAllRecord', () => {
    expect(clearAllRecord(state)).toBeUndefined();
  });
});

describe('deleteRecord', () => {
  test('deleteRecord', () => {
    expect(deleteRecord(state)).toBeUndefined();
  });
  test('deleteRecord', () => {
    expect(deleteRecord({
      baseURL: 'http://localhost:3000',
      mongoDB: [
        {
          id: 4,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Харьков',
        },
        {
          id: 1,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Киев',
        },
      ],
      mySQL: [
        {
          id: 4,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Харьков',
        },
        {
          id: 1,
          phoneNumber: '',
          fname: 'Юлия',
          lname: 'Лихацкая',
          age: '25',
          email: '',
          companyName: '',
          city: 'Киев',
        },
      ],
      currentRecordId: '4',
      currentNode: null,
      isUpdate: false,
      isDelete: true,
      validateStatus: [],
      setCurrentNode(node) {
        this.currentNode = node;
      },
      setCurrentRecordId(id) {
        this.currentRecordId = id;
      },
      setIsUpdate(value) {
        this.isUpdate = value;
      },
    })).toBeUndefined();
  });
});
