import { init } from '../index';
const changeTab = require('../../../logic/header/changeTabSecurity');

changeTab.addClass = jest.fn();
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({}));
describe('init', () => {
  test('init', () => {
    expect(init()).toBeUndefined();
  });
});
