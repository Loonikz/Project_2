import { sendRegister } from '../logic';

jest.mock('../../Main/validation', () => ({
  __esModule: true,
  loginValidate: jest.fn(() => true),
  passwordValidate: jest.fn(() => true),
  confirmPasswordValidate: jest
    .fn(() => false)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true),
}));
jest.mock('../../../logic/header/utils', () => ({
  __esModule: true,
  setInnerText: jest.fn(() => ''),
  collectData: jest.fn(() => {}),
}));
const state = {
  baseURL: 'http://localhost:3000',
};

delete window.location;

describe('sendRegister', () => {
  test('sendRegister status 200', () => {
    global.fetch = jest.fn(
      () => <Promise<Response>>(<unknown>Promise.resolve({
          text: () => '',
          json: () => '',
          status: 200,
        })),
    );
    expect(sendRegister(state)).toBe(true);
  });
  test('sendRegister status 400', () => {
    global.fetch = jest.fn(
      () => <Promise<Response>>(<unknown>Promise.resolve({
          text: () => '',
          json: () => '',
          status: 400,
        })),
    );
    expect(sendRegister(state)).toBe(true);
  });
  test('sendRegister false', () => {
    global.fetch = jest.fn(
      () => <Promise<Response>>(<unknown>Promise.resolve({
          text: () => '',
          json: () => '',
          status: 400,
        })),
    );
    expect(sendRegister(state)).toBe(false);
  });
});
