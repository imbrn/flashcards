import typesWithPrefix from '../utils/typesWithPrefix';

const ActionsTypes = typesWithPrefix('CREATING_DECK', {
  START: 'START',
  UPDATE: 'UPDATE',
  FINISH: 'FINISH',
  CANCEL: 'CANCEL'
});

export default ActionsTypes;
