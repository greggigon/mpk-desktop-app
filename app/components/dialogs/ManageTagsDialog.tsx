import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, DialogContent, Divider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';

import { Board, Tag } from '../../model/board';
import { addTag, deleteTag, updateTag } from '../../features/board/boardSlice';
import ConfirmDialog from './ConfirmDialog';
import TagComponent from '../Tag';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  tagColor: {
    padding: 10,
  },
  tagPreview: {
    marginTop: 5,
    marginLeft: 30,
  },
  formElements: {
    margin: 5,
  },
  currentTag: {
    margin: 5,
  },
  formPadding: {
    padding: 20,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ManageTagsDialogProps {
  close: () => void;
  board: Board;
}

const getDefaultTextColor = (theme) =>
  theme.palette.text.primary === '#fff' ? '#ffffff' : '#000000';

const getTagTextColor = (tag: Tag, defaultColor: string) =>
  tag.textColor || defaultColor;

export default function ManageTagsDialog(props: ManageTagsDialogProps) {
  const defaultTagTextColor = getDefaultTextColor(useTheme());
  const { close, board } = props;
  const [colorSelector, setColorSelector] = React.useState(purple[500]);
  const [textColor, setTextColor] = React.useState(defaultTagTextColor);
  const [tagText, setTagText] = React.useState('');
  const [tagTextPreview, setTagTextPreview] = React.useState('New tag');
  const [editedTag, setEditedTag] = React.useState();
  const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
  const [tagToBeDeleted, setTagToBeDeleted] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    close();
  };

  const colorSelectionChanged = (event) => {
    setColorSelector(event.target.value);
  };

  const textColorSelectionChanged = (event) => {
    setTextColor(event.target.value);
  };

  const handleTagTextChanged = (event) => {
    const newValue = event.target.value;
    setTagText(newValue);
    setTagTextPreview(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editedTag) {
      dispatch(addTag({ name: tagText, color: colorSelector, textColor }));
      setTagText('');
    } else {
      dispatch(
        updateTag({
          id: editedTag.id,
          name: tagText,
          color: colorSelector,
          textColor,
        })
      );
    }
  };

  const confirmDeleteTag = () => {
    dispatch(deleteTag(tagToBeDeleted));
    setConfirmDeleteDialog(false);
    setTagToBeDeleted(null);
  };

  const handleDeleteTag = (tagId) => {
    setConfirmDeleteDialog(true);
    setTagToBeDeleted(tagId);
  };

  const cancelTagDeleteConfirm = () => {
    setConfirmDeleteDialog(false);
    setTagToBeDeleted(null);
  };

  const handleTagClicked = (tag: Tag) => {
    setEditedTag(tag);
    setTagText(tag.name);
    setColorSelector(tag.color);
    setTagTextPreview(tag.name);
  };

  return (
    <Dialog
      fullScreen
      open
      onClose={handleClose}
      TransitionComponent={Transition}
      className={classes.root}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Manage tags
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form onSubmit={handleSubmit} className={classes.formPadding}>
          <FormGroup row style={{ margin: 'auto' }}>
            <div className={classes.formElements}>
              <TextField
                required
                id="outlined-required"
                label="New tag"
                variant="outlined"
                placeholder="Tag"
                helperText="New tag name"
                onChange={handleTagTextChanged}
                error={false}
                value={tagText}
              />
            </div>
            <div className={classes.formElements}>
              <TextField
                type="color"
                label="Tag color"
                variant="outlined"
                helperText="Select tag color"
                onChange={colorSelectionChanged}
                value={colorSelector}
              />
            </div>
            <div className={classes.formElements}>
              <TextField
                type="color"
                label="Text color"
                variant="outlined"
                helperText="Select tag text color"
                onChange={textColorSelectionChanged}
                value={textColor}
              />
            </div>
            <div className={classes.tagPreview}>
              <div>
                <Typography variant="caption">Tag preview</Typography>
              </div>
              <div>
                <TagComponent
                  label={tagTextPreview}
                  backgroundColor={colorSelector}
                  textColor={textColor}
                  className={classes.tagColor}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup row>
            <div className={classes.formElements}>
              {!editedTag && (
                <Button variant="contained" color="primary" type="submit">
                  Add tag
                </Button>
              )}
              {editedTag && (
                <Button variant="contained" color="primary" type="submit">
                  Update tag
                </Button>
              )}
            </div>
          </FormGroup>
        </form>
        <Divider />
        <div className={classes.formPadding}>
          <Typography variant="caption">Your current tags</Typography>
        </div>
        <div className={classes.formPadding}>
          {Object.values(board.tags.byId).map((tag: Tag) => (
            <TagComponent
              label={tag.name}
              backgroundColor={tag.color}
              textColor={tag.textColor}
              onDelete={() => handleDeleteTag(tag.id)}
              onClick={() => handleTagClicked(tag)}
              key={tag.id}
              className={classes.currentTag}
            />
          ))}
        </div>
      </DialogContent>
      <ConfirmDialog
        open={confirmDeleteDialog}
        message="Are you sure? Removing the tag will remove it from all the cards as well."
        dialogTitle="Delete tag"
        onCancel={cancelTagDeleteConfirm}
        onConfirm={confirmDeleteTag}
      />
    </Dialog>
  );
}
