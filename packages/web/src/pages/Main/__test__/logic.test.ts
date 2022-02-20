const { changeLogin, changePassword, logout, clickClear, clickDelete } = require('../logic');
const validation = require('../validation');
//
// jest.mock('../validation', () => {
//   const originalModule = jest.requireActual('../validation');
//   return {
//     __esModule: true,
//     ...originalModule,
//     loginValidate: jest.fn(() => true),
//     passwordValidate: jest.fn(() => true),
//     confirmPasswordValidate: jest.fn(() => true),
//   };
// });
validation.loginValidate = jest.fn(() => true);
validation.passwordValidate = jest.fn(() => true);
validation.confirmPasswordValidate = jest.fn(() => true);
const assignMock = jest.fn();
delete window.location;
// @ts-ignore
window.location = { assign: assignMock };

const state = {
  baseURL: 'http://localhost:3000',
  mongoDB: [],
  mySQL: [],
  currentRecordId: undefined,
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

describe('logout', () => {
  test('logout resolve', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve([]),
    );
    expect(logout(state)).toBeUndefined();
  });
  test('logout reject', () => {
    global.fetch = jest.fn(() => Promise.reject({}));
    expect(logout(state)).toBeUndefined();
  });
});

describe('changePassword', () => {
  test('changePassword status 200', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    expect(changePassword(state)).toBeUndefined();
  });
  test('changePassword status 418', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 418,
      }),
    );
    expect(changePassword(state)).toBeUndefined();
  });
  test('changePassword status 419', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 419,
      }),
    );
    expect(changePassword(state)).toBeUndefined();
  });
  test('changePassword status 500', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      }),
    );
    expect(changePassword(state)).toBeUndefined();
  });
});

describe('changeLogin', () => {
  test('changeLogin status 200', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 200,
      }),
    );
    expect(changeLogin(state)).toBeUndefined();
  });
  test('changeLogin status 418', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 418,
      }),
    );
    expect(changeLogin(state)).toBeUndefined();
  });
  test('changeLogin status 419', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 419,
      }),
    );
    expect(changeLogin(state)).toBeUndefined();
  });
  test('changeLogin status 500', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 500,
      }),
    );
    expect(changeLogin(state)).toBeUndefined();
  });
});

describe('clickDelete', () => {
  test('clickDelete', () => {
    expect(clickDelete(state)).toBeUndefined();
  });
});

describe('clickClear', () => {
  test('clickClear', () => {
    expect(clickClear(state)).toBeUndefined();
  });
});
