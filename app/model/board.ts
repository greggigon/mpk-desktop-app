import { v4 as uuidv4 } from 'uuid';
import { Card } from './cards';

export interface Column {
  title: string;
  id: string;
  cards: Array<string>;
}

export interface Board {
  title: string;
  id: string;
  columns: Array<Column>;
  cards: Array<Card>;
  archive: Array<string>;
  lastUpdated: number;
}

export const createNewBoard = (
  title: string,
  numberOfColumns: number
): Board => {
  const columns: Array<Column> = [];
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
