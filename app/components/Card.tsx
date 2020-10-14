import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert, Flag } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Menu, MenuItem, Paper, Chip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PropTypes, { InferProps } from 'prop-types';

import styles from './Card.css';
import {
  deleteCard,
  archiveCard,
  flagCard,
  unflagCard,
} from '../features/board/boardSlice';
import EditCardDialog from './dialogs/EditCardDialog';

const selectIfTagsShouldShow = (state: RootState): boolean => {
  const { showTagsOnCards } = state.app;
  if (showTagsOnCards === undefined) return false;
  return showTagsOnCards;
};

export default function KanbanCard(
  props: InferProps<typeof KanbanCard.propTypes>
) {
  const { id, title, index, hasArchive, isFlagged } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editCardDialogOpen, setEditCardDialogOpen] = React.useState(false);
  const showTagsOnCards = useSelector(selectIfTagsShouldShow);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const removeCard = () => {
    closeMenu();
    dispatch(deleteCard(id));
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editCard = () => {
    closeMenu();
    setEditCardDialogOpen(true);
  };

  const closeEditDialogDialog = () => {
    setEditCardDialogOpen(false);
  };

  const archiveTheCard = () => {
    closeMenu();
    dispatch(archiveCard(id));
  };

  const handleFlagIt = () => {
    closeMenu();
    dispatch(flagCard(id));
  };

  const handleUnflagIt = () => {
    closeMenu();
    dispatch(unflagCard(id));
  };

  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.card}>
              {isFlagged && (
                <div className={styles.flagContainer}>
                  <Flag />
                </div>
              )}
              <div className={styles.title}>
                <Typography variant="subtitle1">{title}</Typography>
              </div>
              <div className={styles.deleteButton}>
                <IconButton onClick={openMenu}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={editCard}>Edit</MenuItem>
                  {isFlagged ? (
                    <MenuItem onClick={handleUnflagIt}>Unflag it</MenuItem>
                  ) : (
                    <MenuItem onClick={handleFlagIt}>Flag it!</MenuItem>
                  )}
                  <Divider />
                  {hasArchive && (
                    <MenuItem onClick={archiveTheCard}>Archive</MenuItem>
                  )}
                  <MenuItem onClick={removeCard}>Delete</MenuItem>
                </Menu>
              </div>
            </div>
            {showTagsOnCards && (
              <div className={styles.tagsContainer}>
                <Chip
                  size="small"
                  label="Kanban"
                  className={styles.tagOnCard}
                  style={{ backgroundColor: 'green' }}
                />
              </div>
            )}
          </Paper>
        )}
      </Draggable>
      <EditCardDialog
        cardId={id}
        open={editCardDialogOpen}
        onClose={closeEditDialogDialog}
        key={`dialog-${id}`}
      />
    </div>
  );
}

KanbanCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  hasArchive: PropTypes.bool.isRequired,
  isFlagged: PropTypes.bool,
};

KanbanCard.defaultProps = {
  isFlagged: false,
};
