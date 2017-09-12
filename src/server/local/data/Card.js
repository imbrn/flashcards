import { objectValue } from './Utils';

/**
 * Create a card only with the valid properties.
 * @param {*object} params card properties values.
 */
function Card(params) {
  return {
    id: objectValue(params, 'id'),
    front: objectValue(params, 'front'),
    back: objectValue(params, 'back'),
    deck: objectValue(params, 'deck')
  };
}

export default Card;
