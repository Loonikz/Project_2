import { loginIn } from '../logic';

jest.mock('../../Main/validation', () => ({
  __esModule: true,
  loginValidate: jest.fn(() => true),
  passwordValidate: jest.fn(() => false)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true),
}));

const state = {
  baseURL: 'http://localhost:3000',
};

delete window.location;


describe('loginIn', () => {
  test('loginIn status 200', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 200,
      }),
    );
    expect(loginIn(state)).toBe(true);
  });
  test('loginIn status 400', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 400,
      }),
    );
    expect(loginIn(state)).toBe(true);
  });
  test('loginIn false', () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => '',
        json: () => '',
        status: 400,
      }),
    );
    expect(loginIn(state)).toBe(false);
  });
});
