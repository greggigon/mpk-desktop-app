import { createSlice } from '@reduxjs/toolkit';
import { createCard, createNewBoard } from '../../model/cards';

const moveCardFromColumnToColumn = (board, source, destination) => {
  if (destination == null) {
    return;
  }
  if (source.droppableId === destination.droppableId) {
    if (source.index === destination.index) {
      return;
    }
    const sourceColumn = board.columns.find(
      (it) => it.id === source.droppableId
    );
    const card = sourceColumn.cards[source.index];
    sourceColumn.cards.splice(source.index, 1);
    sourceColumn.cards.splice(destination.index, 0, card);
  } else {
    const sourceColumn = board.columns.find(
      (it) => it.id === source.droppableId
    );
    const card = sourceColumn.cards[source.index];
    sourceColumn.cards.splice(source.index, 1);

    const destinationColumn = board.columns.find(
      (it) => it.id === destination.droppableId
    );
    destinationColumn.cards.splice(destination.index, 0, card);
  }
};

const addCardToBoard = (board, title, description, columnId, addAtTheTop) => {
  const card = createCard(title, description);
  board.cards.push(card);
  const columnToAddCardTo = board.columns.find((it) => it.id === columnId);
  if (addAtTheTop) {
    columnToAddCardTo.cards.splice(0, 0, card.id);
  } else {
    const indexToAddCardAt = columnToAddCardTo.cards.length;
    columnToAddCardTo.cards.splice(indexToAddCardAt, 0, card.id);
  }
};

const removeCardFromBoard = (board, cardId) => {
  board.columns.forEach((column) => {
    const indexOfCard = column.cards.indexOf(cardId);
    if (indexOfCard > -1) {
      column.cards.splice(indexOfCard, 1);
    }
  });
  const index = board.cards.findIndex((card) => card.id === cardId);
  board.cards.splice(index, 1);
};

const updateCardDetails = (cards, cardId, title, description) => {
  const card = cards.find((c) => c.id === cardId);
  card.title = title;
  card.description = description;
};

const updateColumnDetails = (board, columnId, title) => {
  const columnToUpdate = board.columns.find((column) => column.id === columnId);
  columnToUpdate.title = title;
};

const archiveTheCard = (board, cardId) => {
  board.columns.forEach((column) => {
    const indexOfCard = column.cards.indexOf(cardId);
    if (indexOfCard > -1) {
      column.cards.splice(indexOfCard, 1);
    }
  });
  board.archive.push({ cardId, archivedOn: Date.now() });
};

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
      const { title, description, columnId, addAtTheTop } = action.payload;
      const board = state.byId[action.selectedBoard];
      addCardToBoard(board, title, description, columnId, addAtTheTop);
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
      const { title, description, cardId } = action.payload;
      updateCardDetails(board.cards, cardId, title, description);
    },
    updateColumn(state, action) {
      const board = state.byId[action.selectedBoard];
      const { columnId, title } = action.payload;
      updateColumnDetails(board, columnId, title);
    },
    archiveCard(state, action) {
      const board = state.byId[action.selectedBoard];
      const cardId = action.payload;
      archiveTheCard(board, cardId);
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
} = boardSlice.actions;

export default boardSlice.reducer;
