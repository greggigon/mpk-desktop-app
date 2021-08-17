import { v4 as uuidv4 } from 'uuid';

export interface Flag {
  status: boolean;
}

export type DateTimeInMiliseconds = number;

export interface Card {
  title: string;
  description: string;
  id: string;
  flag: Flag;
  lastModified: DateTimeInMiliseconds;
  createdAt?: number;
  tags: Array<string>;
  number: number;
  deadline?: DateTimeInMiliseconds;
  pastDeadline?: boolean;
}

export interface Task {
  done: boolean;
  content: string;
  index: number;
}

const createFlag = (status = false) => {
  return { status };
};

const createCard = (
  title: string,
  description: string,
  tags: Array<string>,
  number: number
): Card => {
  return {
    title,
    description,
    id: uuidv4(),
    flag: createFlag(),
    lastModified: Date.now(),
    createdAt: Date.now(),
    tags,
    number,
  };
};

export { createCard, createFlag };
