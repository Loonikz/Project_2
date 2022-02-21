import { init } from '../index';
import changeTab from '../../../logic/header/changeTabSecurity';

changeTab.addClass = jest.fn();

global.fetch = jest.fn(() => <Promise<Response>>Promise.resolve({}));
describe('init', () => {
  test('init', () => {
    expect(init()).toBeUndefined();
  });
});
