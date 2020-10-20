import { Board } from '../../model/board';

const migrateBoards = (boards) => {
  Object.values(boards.byId).forEach((board: Board) => {
    if (!board.tags) {
      board.tags = { byId: {}, allIds: [] };
    }
  });
  return boards;
};

export default migrateBoards;
