import { MockStorage } from './Storage';

describe('Storage', function() {

  it('construction storage', () => {
    const storage = new MockStorage();
    expect(storage._data).not.toBeDefined();
  });

  it('setting data', () => {
    const storage = new MockStorage();
    storage.data = 5;
    expect(storage._data).toBe(5);
  });

  it('getting data', () => {
    const storage = new MockStorage();
    storage._data = 45;
    expect(storage.data).toBe(45);
  });

});
