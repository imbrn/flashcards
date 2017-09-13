import CreateDeck from './CreateDeck';
import FetchDeckByCriteria from './FetchDeckByCriteria';
import Storage from '../storage';

describe('FetchDeckByCriteria', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('fetching deck with success', () => {
    const one = new CreateDeck({ name: 'One', description: 'Deck one' }).execute();
    const two = new CreateDeck({ name: 'Two', description: 'Deck two' }).execute();
    expect(new FetchDeckByCriteria(it => it.name === 'One').execute()).toEqual(one);
    expect(new FetchDeckByCriteria(it => it.description === 'Deck two').execute()).toEqual(two);
    expect(new FetchDeckByCriteria(it => it.id === 1).execute()).toEqual(one);
  });

  it('when no deck applies to criteria returns undefined', () => {
    expect(new FetchDeckByCriteria(it => it.id === 400).execute()).toBeUndefined();
  });

});
