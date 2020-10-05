import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';

const selectCards = (state: RootState) => {
  const selectedBoardId = state.app.selectedBoard;
  return state.boards.byId[selectedBoardId].cards;
};

export default function EditCardDialog(props) {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const { cardId, open, onClose } = props;
  const theCard = cards.find(card => card.id === cardId);

  const [title, setTitle] = React.useState(theCard.title);
  const [titleError, setTitleError] = React.useState(false);
  const [description, setDescription] = React.useState(theCard.description);

  const titleChanged = (event) => {
    if (isBlank(event.target.value)) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    setTitle(event.target.value);
  };

  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  const performUpdate = (event) => {
    event.preventDefault();
    if (!isBlank(title)) {
      dispatch(updateCard({cardId, title, description}));
      onClose();
    } else {
      setTitleError(true);
    }
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth onClose={onClose}>
      <form onSubmit={performUpdate}>
        <DialogTitle id="form-dialog-title">Edit card</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit card details.</DialogContentText>
          <div style={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Card title"
              label="Title"
              onChange={titleChanged}
              value={title}
              error={titleError}
              helperText="Card title can't be empty"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              placeholder="Description"
              rows={4}
              label="Description"
              onChange={descriptionChanged}
              value={description}
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
