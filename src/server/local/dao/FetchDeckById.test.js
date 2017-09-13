import AddDeck from './AddDeck';
import FetchDeckById from './FetchDeckById';
import Storage from '../storage';

describe('FetchDeckById', function() {

  beforeEach(() => {
    Storage.reset();
  });

  it('fetching deck with success', () => {
    const one = new AddDeck({ name: 'One' }).execute();
    const two = new AddDeck({ name: 'Two' }).execute();
    expect(new FetchDeckById(one.id).execute()).toEqual(one);
    expect(new FetchDeckById(two.id).execute()).toEqual(two);
  });

  it('returns undefined when no deck is found', () => {
    expect(new FetchDeckById(1).execute()).toBeUndefined();
  });

});
