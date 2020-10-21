import { Board } from '../../model/board';
import { Card } from '../../model/cards';

const migrateGlobalCounter = (board: Board) => {
  if (!board.cardsCounter) {
    board.cardsCounter = board.cards.length;
    board.cards.forEach((card: Card, index) => {
      card.number = index + 1;
    });
  }
};

const migrateTags = (board: Board) => {
  if (!board.tags) {
    board.tags = { byId: {}, allIds: [] };
  }
};

const migrateBoards = (boards) => {
  Object.values(boards.byId).forEach((board: Board) => {
    migrateTags(board);
    migrateGlobalCounter(board);
  });
  return boards;
};

export default migrateBoards;
