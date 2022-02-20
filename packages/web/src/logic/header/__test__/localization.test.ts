import { changeLng } from '../localization';

describe('changeLng', () => {
  test('changeLng', () => {
    expect(changeLng({ target: <HTMLInputElement>(<unknown>{ value: 'ru' }) })).toBeUndefined();
  });
  test('changeLng', () => {
    expect(changeLng({ target: <HTMLInputElement>(<unknown>undefined) })).toBeUndefined();
  });
});
