import { v4 as uuidv4 } from 'uuid';

const createCard = (title, description) => {
  return { title, description, id: uuidv4() };
};

const createNewBoard = (title, numberOfColumns) => {
  const columns = [];
  for (let i = 0; i < numberOfColumns; i++) {
    columns.push({ title: `Column ${i}`, id: uuidv4(), cards: [] });
  }
  return {
    title,
    id: uuidv4(),
    columns,
    cards: [],
    archive: [],
    lastUpdated: Date.now(),
  };
};

export { createCard, createNewBoard };
