import AddDeck from './AddDeck';
import FetchDeckById from './FetchDeckById';
import UpdateDeck from './UpdateDeck';
import Storage from '../storage';

describe('UpdateDeck', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('should update deck with success', () => {
    const initial = new AddDeck({ name: 'One', description: '1' }).execute();
    expect(new FetchDeckById(initial.id).execute()).toEqual(initial);
    const updated = new UpdateDeck({ id: initial.id, name: 'Two', description: '2' }).execute();
    expect(new FetchDeckById(initial.id).execute()).toEqual(updated);
    expect(initial).not.toEqual(updated);
  });

  it('should throw when updating non added deck', () => {
    expect(() => UpdateDeck({ id : 1, name: 'Two' }).execute()).toThrow();
  });

  it('should not update name when it is not specified', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, description: 'b' }).execute();
    expect(two.name).toBe('A');
    expect(two.description).toBe('b');
  });

  it('should not update description when it is not specified', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, name: 'B' }).execute();
    expect(two.name).toBe('B');
    expect(two.description).toBe('a');
  });

  it('should throw an error when name is null', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    expect(() => new UpdateDeck({ id: one.id, name: null }).execute()).toThrow();
  });

  it('should throw an error when name is empty', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    expect(() => new UpdateDeck({ id: one.id, name: '' }).execute()).toThrow();
  });

  it('should throw an error when name cotains only spaces', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    expect(() => new UpdateDeck({ id: one.id, name: '   ' }).execute()).toThrow();
  });

  it('should update with success when description is null', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, description: null }).execute();
    expect(two).toMatchObject({ name: 'A', description: null });
  });

  it('should update with success when description is undefined', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, description: undefined }).execute();
    expect(two).toMatchObject({ name: 'A', description: undefined });
  });

  it('should update with success when description is empty', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, description: '' }).execute();
    expect(two).toMatchObject({ name: 'A', description: '' });
  });

  it('should update with success when description contains only spaces', () => {
    const one = new AddDeck({ name: 'A', description: 'a' }).execute();
    const two = new UpdateDeck({ id: one.id, description: '  ' }).execute();
    expect(two).toMatchObject({ name: 'A', description: '' });
  });
  
});
