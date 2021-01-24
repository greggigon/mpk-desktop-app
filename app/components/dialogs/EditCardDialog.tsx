import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch } from 'react-redux';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFns from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';

import { updateCard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';
import { Tag } from '../../model/board';
import TagComponent from '../Tag';
import { Card } from '../../model/cards';
import ExpandableDialog from './ExpandableDialog';
import styles from './CardDialogs.css';

interface EditCardDialogProperties {
  card: Card;
  open: boolean;
  onClose: () => void;
  tags: Record<string, Tag>;
}

const dateFunctions = new DateFns();

const cardOrDefaultDate = (card: Card) => {
  return card.deadline
    ? new Date(card.deadline)
    : dateFunctions.addDays(new Date(), 7);
};

export default function EditCardDialog(props: EditCardDialogProperties) {
  const dispatch = useDispatch();
  const { card, open, onClose, tags } = props;

  const [title, setTitle] = React.useState(card.title);
  const [titleError, setTitleError] = React.useState(false);
  const [description, setDescription] = React.useState(card.description);
  const [cardTags, setCardTags] = React.useState(card.tags);
  const [selectedDate, handleDateChange] = React.useState(
    cardOrDefaultDate(card)
  );
  const [setDeadline, setSetDeadline] = React.useState(card.deadline != null);
  const [descRows, setDescRows] = React.useState(5);

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
      const deadline = setDeadline ? selectedDate.getTime() : null;
      dispatch(
        updateCard({ cardId: card.id, title, description, cardTags, deadline })
      );
      onClose();
    } else {
      setTitleError(true);
    }
  };

  const handleTagsChanged = (event, value) => {
    setCardTags(value.map((tag: Tag) => tag.id));
  };

  const lastModified = card?.lastModified
    ? new Date(card.lastModified).toLocaleString()
    : 'Not tracked yet';

  const tagIdsToTags = (ids: Array<string>): Array<Tag> => {
    if (ids) {
      return ids.map((id) => tags[id]);
    }
    return [];
  };
  const switchForDeadline = (
    <Switch
      checked={setDeadline}
      onChange={() => setSetDeadline(!setDeadline)}
      color="primary"
    />
  );

  const changeDialogSize = (size: 'md' | 'xl') => {
    if (size === 'xl') {
      setDescRows(20);
    } else {
      setDescRows(3);
    }
  };

  const tagComponentRender = (value, getTagProps) => {
    return value.map((option, index) => (
      <TagComponent
        key={option.id}
        size="small"
        label={option.name}
        backgroundColor={option.color}
        textColor={option.textColor}
        {...getTagProps({ index })}
      />
    ));
  };

  return (
    <ExpandableDialog
      title="Edit card"
      open={open}
      onClose={onClose}
      onDialogSizeChanged={changeDialogSize}
    >
      <form onSubmit={performUpdate}>
        <DialogContent>
          <div style={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Card title"
              label="Title"
              onChange={titleChanged}
              value={title}
              error={titleError}
              required
              helperText="Card title can't be empty"
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
              value={description}
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
              value={tagIdsToTags(cardTags)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Tags"
                />
              )}
              renderTags={tagComponentRender}
            />
          </div>
          <div className={styles.deadlineContainer}>
            <MuiPickersUtilsProvider utils={DateFns}>
              <DateTimePicker
                label="Deadline"
                inputVariant="outlined"
                onChange={handleDateChange}
                value={selectedDate}
                className={styles.datePicker}
                disabled={!setDeadline}
              />
            </MuiPickersUtilsProvider>
            <FormGroup row className={styles.deadlineSwitch}>
              <FormControlLabel
                control={switchForDeadline}
                label="Set deadline for card"
              />
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: 'space-between', padding: '8px 24px' }}
        >
          <div>
            <Typography variant="caption">
              Last changed on:&nbsp;
              {lastModified}
            </Typography>
          </div>
          <div>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Update
            </Button>
          </div>
        </DialogActions>
      </form>
    </ExpandableDialog>
  );
}
