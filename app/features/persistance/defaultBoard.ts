import { v4 as uuidv4 } from 'uuid';

const cards = [
  { title: 'Create first board', id: uuidv4() },
  { title: 'Add some cards to the board', id: uuidv4() },
  { title: 'Share My Personal Kanban with someone else', id: uuidv4() },
  { title: 'Experiment with the first board', id: uuidv4() },
  { title: 'Find a best Personal Kanban solution', id: uuidv4() },
  { title: 'Download My Personal Kanban', id: uuidv4() },
  { title: 'Install My Personal Kanban', id: uuidv4() },
  { title: 'Decide if Kanban is good for task managment', id: uuidv4() },
];

const cardsInFirstColumn = [cards[0].id, cards[1].id, cards[2].id];
const cardsInSecondColumn = [cards[3].id, cards[4].id];
const cardsInThirdColumn = [cards[5].id, cards[6].id, cards[7].id];

const columns = [
  { title: 'Not started', id: uuidv4(), cards: cardsInFirstColumn },
  { title: 'In progress', id: uuidv4(), cards: cardsInSecondColumn },
  { title: 'Done', id: uuidv4(), cards: cardsInThirdColumn },
];

const board = {
  title: 'Default board',
  id: uuidv4(),
  columns,
  cards,
  archive: [],
  lastUpdated: Date.now(),
};

export default board;
