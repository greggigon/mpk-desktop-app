import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch } from 'react-redux';
import { addCard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';
import { Tag } from '../../model/board';
import ExpandableDialog from './ExpandableDialog';
import styles from './CardDialogs.css';

interface AddNewCardDialogProps {
  columnId: string;
  columnTitle: string;
  onClose: () => void;
  onAdd: (column) => void;
  tags: Record<string, Tag>;
}

export default function AddNewCardDialog(props: AddNewCardDialogProps) {
  const dispatch = useDispatch();

  const { onClose, onAdd, columnId, columnTitle, tags } = props;
  const [open, setOpen] = React.useState(false);
  const [addAtTheTop, setAddAtTheTop] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [cardTags, setCardTags] = React.useState([]);
  const [descRows, setDescRows] = React.useState(5);

  if (columnId != null && !open) {
    setOpen(true);
  }

  const handleCancel = () => {
    setTitleError(false);
    setTitle('');
    setOpen(false);
    onClose();
  };

  const handleAddCard = (event) => {
    event.preventDefault();
    if (!isBlank(title)) {
      dispatch(
        addCard({
          title,
          description,
          columnId,
          addAtTheTop,
          cardTags,
        })
      );
      setOpen(false);
      onAdd(null);
    } else {
      setTitleError(true);
    }
  };

  const titleChanged = (event) => {
    const newTitle = event.target.value;
    if (isBlank(newTitle)) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    setTitle(newTitle);
  };

  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChanged = (event, value) => {
    setCardTags(value.map((tag: Tag) => tag.id));
  };

  const changeDialogSize = (size: 'md' | 'xl') => {
    if (size === 'xl') {
      setDescRows(20);
    } else {
      setDescRows(3);
    }
  };

  if (columnId) {
    const theSwitch = (
      <Switch
        checked={addAtTheTop}
        onChange={() => setAddAtTheTop(!addAtTheTop)}
        color="secondary"
      />
    );
    const dialogTitle = `Add new card to Column: ${columnTitle}`;
    return (
      <ExpandableDialog
        open={open}
        onClose={handleCancel}
        onDialogSizeChanged={changeDialogSize}
        title={dialogTitle}
      >
        <form onSubmit={handleAddCard}>
          <DialogContent>
            <DialogContentText>
              Fill out the details for your new card.
            </DialogContentText>
            <div className={styles.formElements}>
              <TextField
                error={titleError}
                fullWidth
                variant="outlined"
                placeholder="Card title"
                label="Title"
                helperText="Card title can't be empty"
                required
                onChange={titleChanged}
                autoFocus
              />
            </div>
            <div className={styles.formElements}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                placeholder="Description"
                rows={descRows}
                label="Description"
                onChange={descriptionChanged}
              />
            </div>
            <div className={styles.formElements}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={Object.values(tags)}
                getOptionLabel={(tag: Tag) => tag.name}
                filterSelectedOptions
                onChange={handleTagsChanged}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Tags"
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: 'space-between', padding: '8px 24px' }}
          >
            <div>
              <FormGroup row>
                <FormControlLabel
                  control={theSwitch}
                  label="Add Card at the top of the Column"
                />
              </FormGroup>
            </div>
            <div>
              <Button onClick={handleCancel} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Add
              </Button>
            </div>
          </DialogActions>
        </form>
      </ExpandableDialog>
    );
  }
  return <></>;
}
