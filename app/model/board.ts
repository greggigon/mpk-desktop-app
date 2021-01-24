import { v4 as uuidv4 } from 'uuid';
import { Card } from './cards';

export interface Tag {
  name: string;
  color: string;
  id: string;
  textColor?: string;
}

export interface ColumnOptions {
  limiting: boolean;
  limitNumber?: number;
}

export interface Column {
  title: string;
  id: string;
  cards: Array<string>;
  options?: ColumnOptions;
}

export interface Tags {
  byId: Record<string, Tag>;
  allIds: Array<string>;
}

export interface ArchiveEntry {
  cardId: string;
  card: Card;
  archivedOn: number;
}

export interface Board {
  title: string;
  id: string;
  columns: Array<Column>;
  cards: Array<Card>;
  archive: Array<ArchiveEntry>;
  lastUpdated: number;
  tags: Tags;
  cardsCounter: number;
}

export const createTag = (
  name: string,
  color: string,
  textColor: string
): Tag => {
  return { name, color, id: uuidv4(), textColor };
};

export const createNewBoard = (
  title: string,
  numberOfColumns: number
): Board => {
  const columns: Array<Column> = [];
  const options: ColumnOptions = { limiting: false, limitNumber: 0 };
  for (let i = 0; i < numberOfColumns; i += 1) {
    columns.push({ title: `Column ${i}`, id: uuidv4(), cards: [], options });
  }

  return {
    title,
    id: uuidv4(),
    columns,
    cards: [],
    archive: [],
    lastUpdated: Date.now(),
    tags: { byId: {}, allIds: [] },
    cardsCounter: 0,
  };
};
