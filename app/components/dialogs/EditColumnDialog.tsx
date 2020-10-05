import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { updateColumn } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';

interface EditColumnDialogProperties {
  columnId: string;
  title: string;
  open: () => void;
  onClose: () => void;
}

export default function EditColumnDialog(props: EditColumnDialogProperties) {
  const dispatch = useDispatch();
  const { columnId, title, open, onClose } = props;

  const [columnTitle, setColumnTitle] = React.useState(title);
  const [titleError, setTitleError] = React.useState(false);

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
    dispatch(updateColumn({ columnId, title: columnTitle }));
    onClose();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      fullWidth
      onClose={onClose}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
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
