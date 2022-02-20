const { changeTheme } = require('../theme');

describe('changeTheme', () => {
  test('changeTheme', () => {
    expect(changeTheme()).toBeUndefined();
  });
  test('changeTheme', () => {
    expect(changeTheme({ target: { value: 'dark' } })).toBeUndefined();
  });
});
