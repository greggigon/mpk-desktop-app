import { v4 as uuidv4 } from 'uuid';

export interface Flag {
  status: boolean;
}

export interface Card {
  title: string;
  description: string;
  id: string;
  flag: Flag;
}

const createFlag = (status = false) => {
  return { status };
};

const createCard = (title, description): Card => {
  return { title, description, id: uuidv4(), flag: createFlag() };
};

const createNewBoard = (title, numberOfColumns) => {
  const columns = [];
  for (let i = 0; i < numberOfColumns; i + 1) {
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

export { createCard, createNewBoard, createFlag };
