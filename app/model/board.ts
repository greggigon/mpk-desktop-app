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
