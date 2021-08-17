import React from 'react';
import { useDispatch } from 'react-redux';
import { Board } from '../model/board';
import { Card } from '../model/cards';
import { updateCardsPastDeadline } from '../features/board/boardSlice';

interface DeadlineCheckerProperties {
  board: Board;
}

const cardPastDeadline = (card: Card): boolean => {
  if (card.deadline && !card.pastDeadline) {
    const now = new Date().getTime();
    return card.deadline < now;
  }
  return false;
};

export default function DeadlineChecker(props: DeadlineCheckerProperties) {
  const { board } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    const newInterval = setInterval(() => {
      const cardsPastDeadline = board.cards
        .filter(cardPastDeadline)
        .map((c) => c.id);
      if (cardsPastDeadline.length > 0) {
        dispatch(updateCardsPastDeadline(cardsPastDeadline));
      }
    }, 10000);
    return () => {
      clearInterval(newInterval);
    };
  }, [board, dispatch]);

  return <></>;
}
