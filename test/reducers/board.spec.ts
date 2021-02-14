import boardReducer, {
  moveCardToBoard,
  createBoard,
} from '../../app/features/board/boardSlice';
import createTestBoardWith from './testUtils';
import { Board } from '../../app/model/board';

describe('Board reducer', () => {
  describe('Moving cards from one board to another', () => {
    const fromBoard = createTestBoardWith('Test board 1', 3, 3);
    fromBoard.cardsCounter = 3;
    const toBoard = createTestBoardWith('Test board 2', 3, 0);
    toBoard.cardsCounter = 10;
    const state = { byId: {} };
    state.byId[fromBoard.id] = fromBoard;
    state.byId[toBoard.id] = toBoard;
    const payload = {
      cardId: fromBoard.cards[0].id,
      boardId: toBoard.id,
      atTheTop: true,
    };
    const action = {
      type: moveCardToBoard,
      payload,
      selectedBoard: fromBoard.id,
    };
    const result = boardReducer(state, action);
    const newFromBoard: Board = result.byId[fromBoard.id];
    const newToBoard: Board = result.byId[toBoard.id];

    it('should move card from one board to another', () => {
      expect(newFromBoard.columns[0].cards.length).toBe(2);
      expect(newToBoard.columns[0].cards.length).toBe(1);
    });

    it('should move the appropriate card', () => {
      expect(newToBoard.cards[0].id).toBe(payload.cardId);
    });

    it('card moved to a different board should get new Card Number re-assigned', () => {
      expect(newToBoard.cards[0].number).toBe(11);
    });

    it('should update the cards counter on the new board when card is moved', () => {
      expect(newToBoard.cardsCounter).toBe(11);
    });
  });

  describe('Create new board from existing', () => {
    const numberOfColumns = 4;
    const existingBoard = createTestBoardWith(
      'Test board 1',
      numberOfColumns,
      1
    );
    existingBoard.columns.forEach((column, index) => {
      existingBoard.columns[index].title = `test_title_${index}`;
    });
    const state = { byId: {}, allIds: [] };
    state.byId[existingBoard.id] = existingBoard;

    const payload = {
      title: 'Newly created',
      selectedBoardId: existingBoard.id,
      numberOfColumns: numberOfColumns + 1, // This number should be ignored during creation, so an inconsistent state is tested
    };
    const action = {
      type: createBoard,
      payload,
    };
    const result = boardReducer(state, action);
    let createdId;
    result.allIds.forEach((element: string) => {
      if (element !== existingBoard.id) {
        createdId = element;
      }
    });

    const createdBoard = result.byId[createdId];

    it('should have the same number of columns as the existing board', () => {
      expect(createdBoard.columns.length).toBe(numberOfColumns);
    });

    it('should have the same columns as the existing board', () => {
      existingBoard.columns.forEach((column, index) => {
        expect(column.title).toEqual(createdBoard.columns[index].title);
      });
    });
  });
});
