import DeckValidation from './DeckValidation';

describe('DeckValidation', function() {

  it('should throw error when name is undefined', () => {
    expect(() => DeckValidation({ description: 'One' })).toThrow();
  });

  it('should throw error when name is null', () => {
    expect(() => DeckValidation({ name: null, description: 'One' })).toThrow();
  });

  it('should throw error when name is empty', () => {
    expect(() => DeckValidation({ name: '', description: 'One' })).toThrow();
  });

  it('should throw error when name contains only spaces', () => {
    expect(() => DeckValidation({ name: '  ', description: 'One' })).toThrow();
  });

});
