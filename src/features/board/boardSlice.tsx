import { createSlice } from '@reduxjs/toolkit';
import { Board, createNewBoard } from '../../model/board';
import {
  moveCardFromColumnToColumn,
  addCardToBoard,
  removeCardFromBoard,
  updateCardDetails,
  updateColumnDetails,
  archiveTheCard,
  setCardFlag,
  addNewTag,
  deleteTheTag,
  updateTheTag,
  updateCardTask,
  moveCardFromBoardToBoard,
  unarchiveCardsOnBoard,
  deleteFromArchiveOnBoard,
} from './boardOperations';

const boardSlice = createSlice({
  name: 'board',
  initialState: {},
  reducers: {
    moveCard(state, action) {
      const { source, destination } = action.payload;
      const board = state.byId[action.selectedBoard];
      moveCardFromColumnToColumn(board, source, destination);
    },
    addCard(state, action) {
      const { title, description, columnId, addAtTheTop, cardTags } =
        action.payload;
      const board = state.byId[action.selectedBoard];
      const newCardNumber = board.cardsCounter + 1;
      addCardToBoard(
        board,
        title,
        description,
        columnId,
        addAtTheTop,
        cardTags,
        newCardNumber
      );
      board.cardsCounter = newCardNumber;
    },
    deleteCard(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardId = action.payload;
      removeCardFromBoard(board, cardId);
    },
    createBoard(state, action) {
      const { title, numberOfColumns, selectedBoardId } = action.payload;
      let newBoard: Board;

      if (selectedBoardId !== '') {
        const board = state.byId[selectedBoardId];
        newBoard = createNewBoard(title, board.columns.length);
        board.columns.forEach((column, index) => {
          newBoard.columns[index].title = column.title;
        });
      } else {
        newBoard = createNewBoard(title, numberOfColumns);
      }
      state.allIds.push(newBoard.id);
      state.byId[newBoard.id] = newBoard;
    },
    deleteBoard(state, action) {
      const boardToRemove = action.payload;
      const indexOfBoard = state.allIds.indexOf(boardToRemove);
      delete state.byId[boardToRemove];
      state.allIds.splice(indexOfBoard, 1);
    },
    renameBoard(state, action) {
      const { title } = action.payload;
      const board = state.byId[action.selectedBoard];
      board.title = title;
    },
    updateCard(state, action) {
      const board = state.byId[action.selectedBoard];
      const { title, description, cardId, cardTags, deadline } = action.payload;
      updateCardDetails(
        board.cards,
        cardId,
        title,
        description,
        cardTags,
        deadline
      );
    },
    updateColumn(state, action) {
      const board = state.byId[action.selectedBoard];
      const { columnId, title, isLimiting, numberOfCardsLimit } =
        action.payload;
      updateColumnDetails(
        board,
        columnId,
        title,
        isLimiting,
        numberOfCardsLimit
      );
    },
    archiveCard(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardId = action.payload;
      archiveTheCard(board, cardId);
    },
    unarchiveCards(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardIds = action.payload;
      unarchiveCardsOnBoard(cardIds, board);
    },
    deleteFromArchive(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardIds = action.payload;
      deleteFromArchiveOnBoard(cardIds, board);
    },
    flagCard(state, action) {
      const board = state.byId[action.selectedBoard];
      setCardFlag(board.cards, action.payload, true);
    },
    unflagCard(state, action) {
      const board = state.byId[action.selectedBoard];
      setCardFlag(board.cards, action.payload, false);
    },
    addTag(state, action) {
      const board = state.byId[action.selectedBoard];
      const { name, color, textColor } = action.payload;
      addNewTag(board, name, color, textColor);
    },
    deleteTag(state, action) {
      const board = state.byId[action.selectedBoard];
      deleteTheTag(board, action.payload);
    },
    updateTag(state, action) {
      const board = state.byId[action.selectedBoard];
      const { name, color, id, textColor } = action.payload;
      updateTheTag(board, id, name, color, textColor);
    },
    updateCardsPastDeadline(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardIdsThatArePastDeadline = action.payload;
      cardIdsThatArePastDeadline.forEach((cardId) => {
        const card = board.cards.find((c) => c.id === cardId);
        card.pastDeadline = true;
      });
    },
    updateCardsTask(state, action) {
      const board = state.byId[action.selectedBoard];
      const { cardId, taskIndex, taskDone } = action.payload;
      const card = board.cards.find((c) => c.id === cardId);
      updateCardTask(card, taskIndex, taskDone);
    },
    moveCardToBoard(state, action) {
      const board = state.byId[action.selectedBoard];
      const { cardId, boardId, atTheTop } = action.payload;
      moveCardFromBoardToBoard(state.byId, cardId, board, boardId, atTheTop);
    },
  },
});

export const {
  moveCard,
  addCard,
  deleteCard,
  createBoard,
  updateCard,
  updateColumn,
  deleteBoard,
  renameBoard,
  archiveCard,
  flagCard,
  unflagCard,
  addTag,
  deleteTag,
  updateTag,
  updateCardsPastDeadline,
  updateCardsTask,
  moveCardToBoard,
  unarchiveCards,
  deleteFromArchive,
} = boardSlice.actions;

export default boardSlice.reducer;
