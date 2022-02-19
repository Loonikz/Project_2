const {
  loginValidate,
  passwordValidate,
  confirmPasswordValidate,
  validationPhone,
  validationEmail,
  validationCompany,
  validationCity,
  checkValidation,
  validationAge,
  validationName,
} = require('../validation');
const utils = require('../../../logic/header/utils');

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
describe('loginValidate', () => {
  test('loginValidate false', () => {
    expect(loginValidate('')).toBe(false);
  });
  test('loginValidate true', () => {
    utils.getInputValue = jest.fn(() => 'login_login');
    expect(loginValidate('')).toBe(true);
  });
});

describe('passwordValidate', () => {
  test('passwordValidate false', () => {
    expect(passwordValidate('')).toBe(false);
  });
  test('passwordValidate true', () => {
    utils.getInputValue = jest.fn(() => 'password11!');
    expect(passwordValidate('')).toBe(true);
  });
});

describe('confirmPasswordValidate', () => {
  test('confirmPasswordValidate false', () => {
    utils.getInputValue = jest.fn(() => '');
    expect(confirmPasswordValidate('', '')).toBe(false);
  });
  test('confirmPasswordValidate true', () => {
    utils.getInputValue = jest.fn(() => 'password11!');
    expect(confirmPasswordValidate('', '')).toBe(true);
  });
});

describe('validationPhone', () => {
  test('validationPhone', () => {
    expect(validationPhone(state)).toBeUndefined();
  });
  test('validationPhone true', () => {
    utils.getInputValue = jest.fn(() => '380953374745');
    expect(validationPhone(state)).toBeUndefined();
  });
});

describe('validationEmail', () => {
  test('validationEmail', () => {
    expect(validationEmail(state)).toBeUndefined();
  });
  test('validationEmail true', () => {
    utils.getInputValue = jest.fn(() => 'login@login.com');
    expect(validationEmail(state)).toBeUndefined();
  });
});

describe('validationName', () => {
  test('validationName', () => {
    utils.getInputValue = jest.fn(() => 'l');
    expect(validationName(state, '', 0)).toBeUndefined();
  });
  test('validationName true', () => {
    utils.getInputValue = jest.fn(() => 'login_login');
    expect(validationName(state, '', 0)).toBeUndefined();
  });
});

describe('validationAge', () => {
  test('validationAge', () => {
    expect(validationAge(state)).toBeUndefined();
  });
  test('validationAge true', () => {
    utils.getInputValue = jest.fn(() => '22');
    expect(validationAge(state)).toBeUndefined();
  });
});

describe('validationCity', () => {
  test('validationCity', () => {
    utils.getInputValue = jest.fn(() => 'l');
    expect(validationCity(state)).toBeUndefined();
  });
  test('validationCity true', () => {
    utils.getInputValue = jest.fn(() => 'loginlogin');
    expect(validationCity(state)).toBeUndefined();
  });
});

describe('validationCompany', () => {
  test('validationCompany', () => {
    utils.getInputValue = jest.fn(() => 'l');
    expect(validationCompany(state)).toBeUndefined();
  });
  test('validationCompany true', () => {
    utils.getInputValue = jest.fn(() => 'login_login');
    expect(validationCompany(state)).toBeUndefined();
  });
});

describe('checkValidation', () => {
  test('checkValidation', () => {
    expect(checkValidation(state)).toBe(false);
  });
});
