import CardValidation from './CardValidation';

describe('CardValidation', function() {

  it('should not throw error when data is valid', () => {
    expect(() => CardValidation({ front: 'A', back: 'B' })).not.toThrow();
  });

  it('should throw an error when front is undefined', () => {
    expect(() => CardValidation({ back: 'One' })).toThrow();
    expect(() => CardValidation({ front: undefined, back: 'One' })).toThrow();
  });

  it('should throw an error when front is null', () => {
    expect(() => CardValidation({ front: null, back: 'One' })).toThrow();
  });

  it('should throw an error when front is empty', () => {
    expect(() => CardValidation({ front: '', back: 'One' })).toThrow();
  });

  it('should throw an error when front contains only spaces', () => {
    expect(() => CardValidation({ front: '   ', back: 'One'})).toThrow();
  });

  it('should throw an error when back is undefined', () => {
    expect(() => CardValidation({ front: 'One' })).toThrow();
    expect(() => CardValidation({ front: 'One', back: undefined })).toThrow();
  });

  it('should throw an error when back is null', () => {
    expect(() => CardValidation({ front: 'One', back: null })).toThrow();
  });

  it('should throw an error when back is empty', () => {
    expect(() => CardValidation({ front: 'One', back: '' })).toThrow();
  });

  it('should throw an error when back contains only spaces', () => {
    expect(() => CardValidation({ front: 'One', back: '  '})).toThrow();
  });

});
