import LocalStorage from './LocalStorage';

describe('LocalStorage', function() {

  it('persistence of data', () => {
    LocalStorage.data = { one: 'One', two: 2, three: [3, 4, 5] };
    const data = LocalStorage.load();
    expect(data).toEqual(LocalStorage.data);
  });

});

