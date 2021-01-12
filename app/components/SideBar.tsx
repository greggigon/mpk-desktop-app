import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import {
  MoreVert,
  DeleteOutline,
  ArchiveOutlined,
  LocalOfferOutlined,
  EditOutlined,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { Menu, MenuItem, Divider, ListItemIcon } from '@material-ui/core';
import mousetrap from 'mousetrap';

import clsx from 'clsx';
import colorForDarkTheme from '@material-ui/core/colors/lime';
import colorForLightTheme from '@material-ui/core/colors/green';

import { useSelector, useDispatch } from 'react-redux';
import { deleteBoard } from '../features/board/boardSlice';
import { switchToBoard } from '../features/app/appSlice';
import styles from './SideBar.css';
import CardsArchiveDialog from './dialogs/CardsArchiveDialog';
import ThemeSwitch from './ThemeSwitch';
import TagsSwitch from './TagsSwitch';
import SubtaskSwitch from './SubtasksSwitch';
import { RootState } from '../store';
import { MAX_NUMBER_OF_BOARDS } from '../constants/appConfiguration';
import ManageTagsDialog from './dialogs/ManageTagsDialog';
import NewBoardDialog from './dialogs/NewBoardDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
import RenameBoardDialog from './dialogs/RenameBoardDialog';
import { Board } from '../model/board';

const selectBoards = (state: RootState) => {
  return state.boards;
};

const selectedBoard = (state: RootState) => {
  return state.app.selectedBoard;
};

const selectTheme = (state: RootState) => {
  return state.app.theme;
};

const useStyles = makeStyles((theme) => ({
  boardButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  selectedBoardButton: {
    border: `2px solid ${theme.palette.success.light}`,
    borderRadius: 5,
    padding: 2,
  },
}));

const addKeyboardShortcutHnadlingForSwitchinBoards = (callback) => {
  mousetrap.bind('mod+shift+up', () => {
    callback('UP');
    return false;
  });
  mousetrap.bind('mod+shift+down', () => {
    callback('DOWN');
    return false;
  });
};

const getBoardUp = (boards, selectedBoardId) => {
  const indexOfCurrentBoard = boards.allIds.indexOf(selectedBoardId);
  if (indexOfCurrentBoard === 0) return null;
  return boards.allIds[indexOfCurrentBoard - 1];
};

const getBoardDown = (boards, selectedBoardId) => {
  const indexOfCurrentBoard = boards.allIds.indexOf(selectedBoardId);
  if (indexOfCurrentBoard === boards.allIds.length - 1) return null;
  return boards.allIds[indexOfCurrentBoard + 1];
};

export default function SideBar() {
  const boards = useSelector(selectBoards);
  const selectedBoardId = useSelector(selectedBoard);
  const board: Board = boards.byId[selectedBoardId];
  const theme = useSelector(selectTheme);

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [openTagsDialog, setOpenTagsDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [renameBoardDialog, setRenameBoardDialog] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSwitchBoard = (boardId) => {
    dispatch(switchToBoard(boardId));
  };

  const isSelectedBoard = (boardId, theOtherId) => {
    return boardId === theOtherId;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const confirmDeleteBoard = () => {
    const newListOfIds = boards.allIds.slice();
    const indexOfRemovedBoard = boards.allIds.indexOf(selectedBoardId);
    newListOfIds.splice(indexOfRemovedBoard, 1);
    dispatch(switchToBoard(newListOfIds[0]));
    dispatch(deleteBoard(selectedBoardId));
    setConfirmDeleteDialog(false);
  };

  const handleDeleteBoard = () => {
    handleCloseMenu();
    if (boards.allIds.length === 1) return;
    setConfirmDeleteDialog(true);
  };

  const handleCloseArchivesDialog = () => {
    setArchiveDialogOpen(false);
  };

  const handleOpenArchivesDialog = () => {
    setArchiveDialogOpen(true);
    setOpenMenu(false);
  };

  const handleOpenManageTagsDialog = () => {
    setOpenTagsDialog(true);
    setOpenMenu(false);
  };

  const handleRenameBoard = () => {
    setOpenMenu(false);
    setRenameBoardDialog(true);
  };

  const handleCloseTagsDialog = () => {
    setOpenTagsDialog(false);
  };

  const disableAddBoardButton = () => {
    return boards.allIds.length > MAX_NUMBER_OF_BOARDS - 1;
  };

  addKeyboardShortcutHnadlingForSwitchinBoards((upOrDown) => {
    let nextBoardId = null;
    if (upOrDown === 'UP') {
      nextBoardId = getBoardUp(boards, selectedBoardId);
    } else {
      nextBoardId = getBoardDown(boards, selectedBoardId);
    }
    if (nextBoardId) dispatch(switchToBoard(nextBoardId));
  });

  const colorForBoardButton =
    theme === 'dark' ? colorForDarkTheme : colorForLightTheme;
  return (
    <div className={styles.container}>
      {boards.allIds.map((boardId, index) => (
        <Tooltip
          arrow
          title={boards.byId[boardId].title}
          placement="right"
          key={boardId}
          className={clsx(
            classes.boardButton,
            isSelectedBoard(boardId, selectedBoardId) &&
              classes.selectedBoardButton
          )}
        >
          <ButtonBase>
            <Avatar
              variant="rounded"
              style={{
                backgroundColor: colorForBoardButton[100 + 100 * index],
              }}
              onClick={() => handleSwitchBoard(boardId)}
            >
              {boards.byId[boardId].title[0]}
            </Avatar>
          </ButtonBase>
        </Tooltip>
      ))}
      <Box className={styles.addBoard}>
        <Tooltip title="Create new Board" placement="right">
          <IconButton
            aria-label="add"
            onClick={() => setOpen(true)}
            disabled={disableAddBoardButton()}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className={styles.boardMenu}>
        <SubtaskSwitch />
        <TagsSwitch />
        <ThemeSwitch />
        <Tooltip title="Board actions" placement="right" arrow>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openMenu}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleOpenManageTagsDialog}>
            <ListItemIcon>
              <LocalOfferOutlined />
            </ListItemIcon>
            Manage tags
          </MenuItem>
          <MenuItem onClick={handleOpenArchivesDialog}>
            <ListItemIcon>
              <ArchiveOutlined />
            </ListItemIcon>
            View archived cards
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleRenameBoard}>
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            Rename the board
          </MenuItem>
          <MenuItem
            onClick={handleDeleteBoard}
            disabled={boards.allIds.length < 2}
          >
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            Delete current board
          </MenuItem>
        </Menu>
      </Box>
      {open && <NewBoardDialog close={handleClose} />}
      {openTagsDialog && (
        <ManageTagsDialog close={handleCloseTagsDialog} board={board} />
      )}
      <CardsArchiveDialog
        open={archiveDialogOpen}
        onClose={handleCloseArchivesDialog}
        archive={board.archive}
      />
      <ConfirmDialog
        open={confirmDeleteDialog}
        onCancel={() => setConfirmDeleteDialog(false)}
        onConfirm={confirmDeleteBoard}
        message="Are you sure you would like to delete this board?"
        dialogTitle="Delete board"
      />
      <RenameBoardDialog
        open={renameBoardDialog}
        onCancel={() => setRenameBoardDialog(false)}
        onConfirm={() => setRenameBoardDialog(false)}
        boardName={board.title}
      />
    </div>
  );
}
