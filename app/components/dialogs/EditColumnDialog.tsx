import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch } from 'react-redux';

import { updateColumn } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';
import { Column } from '../../model/board';

interface EditColumnDialogProps {
  onClose: () => void;
  column: Column;
}

export default function EditColumnDialog(props: EditColumnDialogProps) {
  const dispatch = useDispatch();

  const { column, onClose } = props;
  const { id } = column;

  const [columnTitle, setColumnTitle] = React.useState(column.title);
  const [titleError, setTitleError] = React.useState(false);
  const [limitNumberError, setLimitNumberError] = React.useState(false);
  const [isLimiting, setIsLimiting] = React.useState(
    column.options?.limiting || false
  );
  const [numberOfCardsLimit, setNumberOfCardsLimit] = React.useState(
    column.options?.limitNumber || 1
  );

  const closeDialog = () => {
    setTitleError(false);
    setLimitNumberError(false);
    onClose();
  };

  const titleChanged = (event) => {
    if (isBlank(event.target.value)) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    setColumnTitle(event.target.value);
  };

  const performUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateColumn({
        columnId: id,
        title: columnTitle,
        isLimiting,
        numberOfCardsLimit,
      })
    );
    closeDialog();
  };

  const handleLimitsChanged = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    if (!isBlank(newValue) && newValue > 0) {
      setLimitNumberError(false);
    } else {
      setLimitNumberError(true);
    }
    setNumberOfCardsLimit(newValue);
  };

  const limitNumberOfCardsSwitch = (
    <Switch
      checked={isLimiting}
      onChange={() => setIsLimiting(!isLimiting)}
      color="secondary"
    />
  );

  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      fullWidth
      onClose={closeDialog}
    >
      <form onSubmit={performUpdate}>
        <DialogTitle id="form-dialog-title">Edit column</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit column details.</DialogContentText>
          <div style={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Column title"
              label="Title"
              helperText="Column title can't be empty"
              required
              onChange={titleChanged}
              value={columnTitle}
              error={titleError}
            />
          </div>
          <FormGroup row>
            <FormControlLabel
              control={limitNumberOfCardsSwitch}
              label="Limit number of cards in column"
            />
            <TextField
              variant="outlined"
              disabled={!isLimiting}
              label="Cards"
              onChange={handleLimitsChanged}
              helperText="Number of cards greater than 0"
              type="number"
              required
              value={numberOfCardsLimit}
              error={limitNumberError}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
