import { createSlice } from '@reduxjs/toolkit';
import { createNewBoard } from '../../model/board';
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
      const {
        title,
        description,
        columnId,
        addAtTheTop,
        cardTags,
      } = action.payload;
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
    },
    deleteCard(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardId = action.payload;
      removeCardFromBoard(board, cardId);
    },
    createBoard(state, action) {
      const { title, numberOfColumns } = action.payload;
      const newBoard = createNewBoard(title, numberOfColumns);
      state.allIds.push(newBoard.id);
      state.byId[newBoard.id] = newBoard;
    },
    deleteBoard(state, action) {
      const boardToRemove = action.payload;
      const indexOfBoard = state.allIds.indexOf(boardToRemove);
      delete state.byId[boardToRemove];
      state.allIds.splice(indexOfBoard, 1);
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
      const {
        columnId,
        title,
        isLimiting,
        numberOfCardsLimit,
      } = action.payload;
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
      const { name, color } = action.payload;
      addNewTag(board, name, color);
    },
    deleteTag(state, action) {
      const board = state.byId[action.selectedBoard];
      deleteTheTag(board, action.payload);
    },
    updateTag(state, action) {
      const board = state.byId[action.selectedBoard];
      const { name, color, id } = action.payload;
      updateTheTag(board, id, name, color);
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
  archiveCard,
  flagCard,
  unflagCard,
  addTag,
  deleteTag,
  updateTag,
} = boardSlice.actions;

export default boardSlice.reducer;
