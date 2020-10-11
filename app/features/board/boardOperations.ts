import { createCard, createFlag } from '../../model/cards';

export const moveCardFromColumnToColumn = (board, source, destination) => {
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

export const addCardToBoard = (
  board,
  title,
  description,
  columnId,
  addAtTheTop
) => {
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

export const removeCardFromBoard = (board, cardId) => {
  board.columns.forEach((column) => {
    const indexOfCard = column.cards.indexOf(cardId);
    if (indexOfCard > -1) {
      column.cards.splice(indexOfCard, 1);
    }
  });
  const index = board.cards.findIndex((card) => card.id === cardId);
  board.cards.splice(index, 1);
};

export const updateCardDetails = (cards, cardId, title, description) => {
  const card = cards.find((c) => c.id === cardId);
  card.title = title;
  card.description = description;
};

export const updateColumnDetails = (board, columnId, title) => {
  const columnToUpdate = board.columns.find((column) => column.id === columnId);
  columnToUpdate.title = title;
};

export const archiveTheCard = (board, cardId) => {
  board.columns.forEach((column) => {
    const indexOfCard = column.cards.indexOf(cardId);
    if (indexOfCard > -1) {
      column.cards.splice(indexOfCard, 1);
    }
  });
  board.archive.push({ cardId, archivedOn: Date.now() });
};

export const setCardFlag = (cards, cardId, flag: boolean) => {
  const card = cards.find((c) => c.id === cardId);
  if (!card.flag) {
    card.flag = createFlag(flag);
  }
  card.flag.status = flag;
};
