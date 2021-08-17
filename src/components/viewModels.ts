import { Card } from '../model/cards';

export type CardAction = 'edit' | 'moveBetweenBoard';

export interface SelectedCardAndAction {
  card: Card;
  action: CardAction;
}
