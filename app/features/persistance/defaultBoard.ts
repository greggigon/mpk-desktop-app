import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../model/board';
import { createCard } from '../../model/cards';

const cards = [
  createCard('Create first board', '', [], 1),
  createCard('Add some cards to the board', '', [], 2),
  createCard('Share My Personal Kanban with someone else', '', [], 3),
  createCard('Experiment with the first board', '', [], 4),
  createCard('Find a best Personal Kanban solution', '', [], 5),
  createCard('Download My Personal Kanban', '', [], 6),
  createCard('Install My Personal Kanban', '', [], 7),
  createCard('Decide if Kanban is good for task managment', '', [], 8),
];

const cardsInFirstColumn = [cards[0].id, cards[1].id, cards[2].id];
const cardsInSecondColumn = [cards[3].id, cards[4].id];
const cardsInThirdColumn = [cards[5].id, cards[6].id, cards[7].id];

const columns = [
  { title: 'Not started', id: uuidv4(), cards: cardsInFirstColumn },
  { title: 'In progress', id: uuidv4(), cards: cardsInSecondColumn },
  { title: 'Done', id: uuidv4(), cards: cardsInThirdColumn },
];

const board: Board = {
  title: 'Default board',
  id: uuidv4(),
  columns,
  cards,
  archive: [],
  lastUpdated: Date.now(),
  tags: { byId: {}, allIds: new Array<string>() },
  deadlines: {},
  cardsCounter: 9,
};

const boards = {
  byId: {},
  allIds: new Array<string>(),
};

boards.byId[board.id] = board;
boards.allIds.push(board.id);

export default boards;
