import { getLocalStorage } from '../getLocalStorage';

const utils = require('../utils');

describe('getLocalStorage', () => {
  test('getLocalStorage', () => {
    expect(getLocalStorage()).toBeUndefined();
  });
  test('getLocalStorage', () => {
    utils.getValueLocalStorage = jest.fn(() => 'dark');
    expect(getLocalStorage()).toBeUndefined();
  });
});
