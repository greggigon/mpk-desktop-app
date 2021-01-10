import boardReducer, {
  moveCardToBoard,
} from '../../app/features/board/boardSlice';
import createBoard from './testUtils';
import { Board } from '../../app/model/board';

describe('Board reducer', () => {
  describe('Moving cards from one board to another', () => {
    const fromBoard = createBoard('Test board 1', 3, 3);
    fromBoard.cardsCounter = 3;
    const toBoard = createBoard('Test board 2', 3, 0);
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
});
