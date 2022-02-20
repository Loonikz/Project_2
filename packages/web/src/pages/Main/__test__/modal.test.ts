import { closeCreateModal, closeSecurity, eventClickWithoutModal } from '../modal';

describe('closeCreateModal', () => {
  test('closeCreateModal', () => {
    expect(closeCreateModal()).toBeUndefined();
  });
});

describe('closeSecurity', () => {
  test('closeSecurity', () => {
    expect(closeSecurity()).toBeUndefined();
  });
});

describe('eventClickWithoutModal', () => {
  test('eventClickWithoutModal', () => {
    expect(
      eventClickWithoutModal('', '',{
        target: {
          classList: { contains: () => true },
          localName: '',
        },
      }),
    ).toBeUndefined();
  });
  test('eventClickWithoutModal while modal-create-update', () => {
    expect(
      eventClickWithoutModal('modal-create-update', '',{
        target: {
          classList: { contains: () => false },
          localName: 'body',
          parentNode: { classList: { contains: () => true }, localName: '' },
        },
      }),
    ).toBeUndefined();
  });
  test('eventClickWithoutModal while modal-security', () => {
    expect(
      eventClickWithoutModal('modal-security', '',{
        target: {
          classList: { contains: () => false },
          localName: 'body',
          parentNode: { classList: { contains: () => true }, localName: '' },
        },
      }),
    ).toBeUndefined();
  });
  test('eventClickWithoutModal if', () => {
    expect(
      eventClickWithoutModal('', '',{
        target: {
          classList: { contains: () => false },
          localName: '',
          parentNode: { classList: { contains: () => false }, localName: 'body' },
        },
      }),
    ).toBeUndefined();
  });
});
