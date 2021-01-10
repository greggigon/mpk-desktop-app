import { createNewBoard, Board } from '../../app/model/board';
import { createCard, Card } from '../../app/model/cards';

const createTestBoardWith = (
  name: string,
  numberOfColumns: number,
  numberOfCards: number
): Board => {
  const board = createNewBoard(name, numberOfColumns);
  for (let i = 0; i < numberOfCards; i += 1) {
    const newCard: Card = createCard(
      `Card number ${i}`,
      `Description for card number ${i}`,
      [],
      i
    );
    board.cards.push(newCard);
    board.columns[0].cards.push(newCard.id);
  }
  return board;
};

export default createTestBoardWith;
