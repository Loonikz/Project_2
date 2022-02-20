const { changeLng } = require('../localization');

describe('changeLng', () => {
  test('changeLng', () => {
    expect(changeLng({ target: { value: 'ru' } })).toBeUndefined();
  });
  test('changeLng', () => {
    expect(changeLng({})).toBeUndefined();
  });
});
