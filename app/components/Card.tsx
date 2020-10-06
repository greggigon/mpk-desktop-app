import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Menu, MenuItem, Paper } from '@material-ui/core';

import styles from './Card.css';
import { deleteCard, archiveCard } from '../features/board/boardSlice';
import EditCardDialog from './dialogs/EditCardDialog';

interface KanbanCardProptries {
  id: string;
  title: string;
  index: number;
  hasArchive: boolean;
}

export default function KanbanCard(props: KanbanCardProptries) {
  const { id, title, index, hasArchive } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editCardDialogOpen, setEditCardDialogOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const removeCard = () => {
    dispatch(deleteCard(id));
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const editCard = () => {
    closeMenu();
    setEditCardDialogOpen(true);
  };

  const closeEditDialogDialog = () => {
    setEditCardDialogOpen(false);
  };

  const archiveTheCard = () => {
    dispatch(archiveCard(id));
  };

  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Paper
            className={styles.card}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.title}>
              <Typography variant="subtitle1">{title}</Typography>
            </div>
            <div className={styles.deleteButton}>
              <IconButton onClick={openMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={closeMenu}
              >
                <MenuItem onClick={editCard}>Edit</MenuItem>
                {hasArchive && (
                  <MenuItem onClick={archiveTheCard}>Archive</MenuItem>
                )}
                <MenuItem onClick={removeCard}>Delete</MenuItem>
              </Menu>
            </div>
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
