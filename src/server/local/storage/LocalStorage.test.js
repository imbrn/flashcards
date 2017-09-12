import LocalStorage, { MockLocalStorage } from './LocalStorage';

describe('LocalStorage', function() {

  beforeAll(() => {
    window.localStorage = new MockLocalStorage();
  });

  it('persistence of data', () => {
    const one = new LocalStorage();
    one.data = { one: 'One', two: 2, three: [3, 4, 5] };
    const two = new LocalStorage();
    expect(two.data).toEqual(one.data);
  });

});

