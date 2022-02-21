import { changeTheme } from '../theme';

describe('changeTheme', () => {
  test('changeTheme', () => {
    expect(changeTheme(null)).toBeUndefined();
  });
  test('changeTheme', () => {
    expect(changeTheme({ target: { value: 'dark' } })).toBeUndefined();
  });
});
