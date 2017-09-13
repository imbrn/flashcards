import { objectValue, trim } from './Utils';

/**
 * Create a card only with the valid properties.
 * @param {*object} params card properties values.
 */
function Card(params) {
  return {
    id: objectValue(params, 'id'),
    front: objectValue(params, 'front', null, trim),
    back: objectValue(params, 'back', null, trim),
    deck: objectValue(params, 'deck')
  };
}

export default Card;
