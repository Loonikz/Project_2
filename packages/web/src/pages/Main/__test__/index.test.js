const { init } = require('../index');
const changeTab = require('../../../logic/header/changeTabSecurity');
changeTab.addClass = jest.fn();
global.fetch = jest.fn(() =>
  Promise.resolve({}),
);
describe('init', () => {
  test('init', () => {
    expect(init()).toBeUndefined();
  });
});
