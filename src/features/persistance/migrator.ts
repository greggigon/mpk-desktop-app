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

const migrateArchives = (board: Board) => {
  if (board.archive.length > 0) {
    if (board.archive[0].card === undefined) {
      board.archive = board.archive.map((archiveEntry) => {
        const { cardId, archivedOn } = archiveEntry;
        const cardIndex = board.cards.findIndex(
          (card) => card.id === archiveEntry.cardId
        );
        const card = board.cards.splice(cardIndex, 1)[0];
        return { cardId, archivedOn, card };
      });
    }
  }
};

const migrateBoards = (boards) => {
  Object.values(boards.byId).forEach((board: Board) => {
    migrateTags(board);
    migrateGlobalCounter(board);
    migrateArchives(board);
  });
  return boards;
};

export default migrateBoards;
