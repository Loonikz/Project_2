const { closeCreateModal, closeSecurity } = require('../modal');

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
