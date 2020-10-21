import { v4 as uuidv4 } from 'uuid';

export interface Flag {
  status: boolean;
}

export interface Card {
  title: string;
  description: string;
  id: string;
  flag: Flag;
  lastModified: number;
  createdAt?: number;
  tags: Array<string>;
}

const createFlag = (status = false) => {
  return { status };
};

const createCard = (
  title: string,
  description: string,
  tags: Array<string>
): Card => {
  return {
    title,
    description,
    id: uuidv4(),
    flag: createFlag(),
    lastModified: Date.now(),
    createdAt: Date.now(),
    tags,
  };
};

export { createCard, createFlag };
