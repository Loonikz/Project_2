import { addClass, changeTabSecurity } from '../changeTabSecurity';

describe('changeTabSecurity', () => {
  global.document.querySelectorAll = jest.fn(
    () => <NodeListOf<any>>(<unknown>[
        {
          addEventListener: () => {},
        },
      ]),
  );
  test('changeTabSecurity', () => {
    expect(changeTabSecurity()).toBeUndefined();
  });
});

describe('addClass', () => {
  test('addClass', () => {
    expect(
      addClass(
        [
          {
            addEventListener: () => {},
            getAttribute: () => '',
            classList: {
              add: () => {},
            },
          },
        ],
        [
          {
            addEventListener: () => {},
            getAttribute: () => '',
            classList: {
              add: () => {},
            },
          },
        ],
        {
          target: { getAttribute: () => '' },
          preventDefault: () => {},
        },
      ),
    ).toBeUndefined();
  });
  test('addClass', () => {
    expect(
      addClass(
        [
          {
            addEventListener: () => {},
            getAttribute: () => '',
            classList: {
              remove: () => {},
            },
          },
        ],
        [
          {
            addEventListener: () => {},
            getAttribute: () => '',
            classList: {
              remove: () => {},
            },
          },
        ],
        {
          target: { getAttribute: () => 'ddddd' },
          preventDefault: () => {},
        },
      ),
    ).toBeUndefined();
  });
});
