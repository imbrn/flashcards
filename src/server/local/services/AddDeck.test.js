import AddDeck from './AddDeck';
import Storage from '../storage';

describe('Add deck success', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should resolves to the added deck', async () => {
    await expect(AddDeck({ name: 'One', description: 'Deck one' })).resolves.toMatchObject({
      name: 'One',
      description: 'Deck one'
    });
  });

});

describe('Text auto trimming', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should trim name', async () => {
    await expect(AddDeck({ name: '    One    ' })).resolves.toMatchObject({
      name: 'One'
    });
  });
  
  it('should trim description', async () => {
    await expect(AddDeck({ name: 'One', description: '  Two  ' })).resolves.toMatchObject({
      description: 'Two'
    });
  });

});

describe('Name is not optional', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should rejects when name is not defined', async () => {
    await expect(AddDeck({  description: 'One' })).rejects.toBeDefined();
  });

  it('should rejects when name is null', async () => {
    await expect(AddDeck({ name: null, description: 'One' })).rejects.toBeDefined();
  });

  it('should rejects when name is empty', async () => {
    await expect(AddDeck({ name: '', description: 'One' })).rejects.toBeDefined();
  });

  it('should rejects when name contains only spaces', async () => {
    await expect(AddDeck({ name: '  ', description: 'One' })).rejects.toBeDefined();
  });

});

describe('Description is optional', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should resolves when description is not defined', async () => {
    await expect(AddDeck({  name: 'One' })).resolves.toBeDefined();
  });

  it('should resolves when description is null', async () => {
    await expect(AddDeck({ name: 'One', description: null })).resolves.toBeDefined();
  });

  it('should resolves when description is empty', async () => {
    await expect(AddDeck({ name: 'One', description: '' })).resolves.toBeDefined();
  });

  it('should resolves when description contains only spaces', async () => {
    await expect(AddDeck({ name: 'One', description: '  ' })).resolves.toBeDefined();
  });

});
