import Card from '../../model/Card';

function buildCard(doc) {
  return Card({
    id: doc.id,
    ...doc.data()
  });
}

export default buildCard;
