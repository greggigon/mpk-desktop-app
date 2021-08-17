import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { renameBoard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';

interface RenameBoardProps {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  boardName: string;
}

export default function RenameBoardDialog(props: RenameBoardProps) {
  const { onConfirm, onCancel, open, boardName } = props;
  const [boardTitle, setBoardTitle] = useState(boardName);
  const [boardNameError, setBoardNameError] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBoardTitle(boardName);
  }, [boardName]);

  const titleChanged = (event) => {
    if (isBlank(event.target.value)) {
      setBoardNameError(true);
    } else {
      setBoardNameError(false);
    }
    setBoardTitle(event.target.value);
  };

  const changeBoardName = () => {
    if (!boardNameError) {
      dispatch(renameBoard({ title: boardTitle }));
      onConfirm();
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="rename-board"
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Rename the board</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Board name"
            helperText="Board name can't be empty"
            placeholder="Board name"
            value={boardTitle}
            onChange={titleChanged}
            error={boardNameError}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={changeBoardName}
            color="secondary"
            variant="contained"
          >
            Rename
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
