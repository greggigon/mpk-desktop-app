import { Board, ColumnOptions, createTag } from '../../model/board';
import { Card, Task, createCard, createFlag } from '../../model/cards';
import { extractTasks } from '../../utils/stringUtils';

export const moveCardFromColumnToColumn = (board, source, destination) => {
  if (destination == null) {
    return;
  }
  const sourceColumn = board.columns.find((it) => it.id === source.droppableId);
  const cardId = sourceColumn.cards[source.index];

  if (source.droppableId === destination.droppableId) {
    if (source.index === destination.index) {
      return;
    }
    sourceColumn.cards.splice(source.index, 1);
    sourceColumn.cards.splice(destination.index, 0, cardId);
  } else {
    sourceColumn.cards.splice(source.index, 1);
    const destinationColumn = board.columns.find(
      (it) => it.id === destination.droppableId
    );
    destinationColumn.cards.splice(destination.index, 0, cardId);
  }
  const card: Card = board.cards.find((it) => it.id === cardId);
  card.lastModified = Date.now();
};

export const addCardToBoard = (
  board,
  title,
  description,
  columnId,
  addAtTheTop,
  cardTags,
  cardNumber
) => {
  const card: Card = createCard(title, description, cardTags, cardNumber);
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

export const updateCardDetails = (
  cards,
  cardId,
  title,
  description,
  cardTags,
  deadline
) => {
  const card: Card = cards.find((it) => it.id === cardId);
  card.title = title;
  card.description = description;
  card.tags = cardTags;
  if (deadline !== card.deadline) {
    card.deadline = deadline;
    card.pastDeadline = false;
  }
  card.lastModified = Date.now();
};

export const updateColumnDetails = (
  board: Board,
  columnId: string,
  title: string,
  isLimiting: boolean,
  numberOfCardsLimit: number
) => {
  const columnToUpdate = board.columns.find((column) => column.id === columnId);
  if (columnToUpdate) {
    columnToUpdate.title = title;
    columnToUpdate.options = {
      limitNumber: numberOfCardsLimit,
      limiting: isLimiting,
    } as ColumnOptions;
  }
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
  const card: Card = cards.find((it) => it.id === cardId);
  if (!card.flag) {
    card.flag = createFlag(flag);
  }
  card.flag.status = flag;
  card.lastModified = Date.now();
};

export const addNewTag = (board: Board, name: string, color: string) => {
  const newTag = createTag(name, color);
  board.tags.byId[newTag.id] = newTag;
  board.tags.allIds.push(newTag.id);
};

export const deleteTheTag = (board: Board, tagId: string) => {
  delete board.tags.byId[tagId];
  const indexOfTag = board.tags.allIds.indexOf(tagId);
  board.tags.allIds.splice(indexOfTag, 1);
  board.cards.forEach((card: Card) => {
    if (card.tags) {
      const tagInCard = card.tags.indexOf(tagId);
      card.tags.splice(tagInCard, 1);
    }
  });
};

export const updateTheTag = (
  board: Board,
  id: string,
  name: string,
  color: string
) => {
  const theTag = board.tags.byId[id];
  theTag.name = name;
  theTag.color = color;
};

export const updateCardTask = (
  card: Card,
  taskIndex: number,
  taskDone: boolean
) => {
  const tasks: Array<Task> = extractTasks(card.description);
  const taskContent = tasks[taskIndex].content;
  const regexReplacement = new RegExp(`-.?\\[(.*)\\].*${taskContent}`, 'g');

  if (taskDone) {
    card.description = card.description.replace(
      regexReplacement,
      `- [x] ${taskContent}`
    );
  } else {
    card.description = card.description.replace(
      regexReplacement,
      `- [ ] ${taskContent}`
    );
  }
};
