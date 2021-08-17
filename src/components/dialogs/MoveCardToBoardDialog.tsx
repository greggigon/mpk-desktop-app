import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../store';
import { Board } from '../../model/board';
import { Card } from '../../model/cards';
import { moveCardToBoard } from '../../features/board/boardSlice';
import styles from './CardDialogs.css';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  card: Card;
  open: boolean;
}

const selectAllOtherBoards = (state: RootState) => {
  const { selectedBoard } = state.app;
  const { boards } = state;
  return boards.allIds
    .filter((boardId) => boardId !== selectedBoard)
    .map((boardId) => {
      const board: Board = boards.byId[boardId];
      return { boardId, title: board.title };
    });
};

export default function MoveCardToBoardDialog(props: ConfirmDialogProps) {
  const { onConfirm, onCancel, card, open } = props;
  const boards = useSelector(selectAllOtherBoards);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [addAtTheTop, setAddAtTheTop] = useState(true);
  const dispatch = useDispatch();

  const handleBoardSelected = (event) => {
    const boardId = event.target.value;
    setSelectedBoard(boardId);
  };

  const theSwitch = (
    <Switch
      checked={addAtTheTop}
      onChange={() => setAddAtTheTop(!addAtTheTop)}
      color="primary"
    />
  );

  const moveTheCard = () => {
    dispatch(
      moveCardToBoard({
        cardId: card.id,
        boardId: selectedBoard,
        atTheTop: addAtTheTop,
      })
    );
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-move-card-to-board"
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        Move card to another board
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Moving card ..."
            value={card.title}
            disabled
          />
        </div>
        <div className={styles.formElements}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-board">... to a board</InputLabel>
            <Select
              onChange={handleBoardSelected}
              fullWidth
              labelId="select-board"
              label="... to a board"
              value={selectedBoard}
            >
              {boards.map((entry) => (
                <MenuItem value={entry.boardId} key={entry.boardId}>
                  {entry.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formElements}>
          <Typography>
            The card will be moved to the first column of the board
          </Typography>
        </div>
        <div className={styles.formElements}>
          <FormGroup row>
            <FormControlLabel
              control={theSwitch}
              label="Move Card to the top of the Column"
            />
          </FormGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={moveTheCard} color="primary" variant="contained">
            Move
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
