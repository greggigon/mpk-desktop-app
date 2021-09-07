import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { ViewColumn } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { DragDropContext } from 'react-beautiful-dnd';
import mousetrap from 'mousetrap';

import styles from './Board.css';
import Column from './Column';
import { moveCard } from '../features/board/boardSlice';
import { RootState } from '../store';
import AddNewCardDialog from './dialogs/AddNewCardDialog';
import EditCardDialog from './dialogs/EditCardDialog';
import { Board as BoardType, Column as ColumnType } from '../model/board';
import { Card } from '../model/cards';
import { SelectedCardAndAction } from './viewModels';
import DeadlineChecker from './DeadlineChecker';
import MoveCardToBoardDialog from './dialogs/MoveCardToBoardDialog';

const selectBoard = (state: RootState): BoardType => {
  const { selectedBoard } = state.app;
  return state.boards.byId[selectedBoard];
};

const useStyles = makeStyles({
  speedDial: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

const addKeyboardShortcutHandling = (handler) => {
  mousetrap.bind('Shif+A', () => {
    handler();
    return false;
  });
};

export default function Board() {
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedCardAndAction, setSelectedCardAndAction] =
    useState<SelectedCardAndAction | null>(null);

  const handleOpen = (event) => {
    if (event.type === 'focus') {
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedColumn(null);
  };

  const handleAdd = (column) => {
    setOpen(false);
    setSelectedColumn(column);
  };

  const onDragEnd = (result) => {
    dispatch(moveCard(result));
  };

  const cardIdsToCardsList = (
    column: ColumnType,
    cards: Array<Card>
  ): Array<Card> => {
    return column.cards
      .map((cardId: string) => cards.find((it: Card) => it.id === cardId))
      .filter((card) => card !== undefined);
  };

  const handleEditDialogClosed = () => {
    setSelectedCardAndAction(null);
  };

  const handleCardSelectedForAction = (
    cardAndAction: SelectedCardAndAction
  ) => {
    setSelectedCardAndAction(cardAndAction);
  };

  addKeyboardShortcutHandling(() => {
    const firstColumn = board.columns[0];
    handleAdd(firstColumn);
  });

  return (
    <div className={styles.container} data-tid="container">
      <DragDropContext onDragEnd={onDragEnd}>
        {board.columns.map((column, index) => (
          <Column
            column={column}
            cards={cardIdsToCardsList(column, board.cards)}
            key={`column-${column.id}`}
            index={index}
            isLastColumn={index + 1 === board.columns.length}
            tags={board.tags.byId}
            onCardSelected={handleCardSelectedForAction}
          />
        ))}
      </DragDropContext>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {board.columns.map((column) => (
          <SpeedDialAction
            key={column.title}
            icon={<ViewColumn />}
            tooltipTitle={column.title}
            tooltipOpen
            onClick={() => handleAdd(column)}
          />
        ))}
      </SpeedDial>
      {selectedColumn && (
        <AddNewCardDialog
          columnId={selectedColumn.id}
          columnTitle={selectedColumn.title}
          onAdd={handleAdd}
          onClose={handleCancel}
          tags={board.tags.byId}
        />
      )}
      {selectedCardAndAction && selectedCardAndAction.action === 'edit' && (
        <EditCardDialog
          card={selectedCardAndAction.card}
          open
          onClose={handleEditDialogClosed}
          tags={board.tags.byId}
        />
      )}
      {selectedCardAndAction &&
        selectedCardAndAction.action === 'moveBetweenBoard' && (
          <MoveCardToBoardDialog
            open
            card={selectedCardAndAction.card}
            onConfirm={handleEditDialogClosed}
            onCancel={handleEditDialogClosed}
          />
        )}
      <DeadlineChecker board={board} />
    </div>
  );
}
