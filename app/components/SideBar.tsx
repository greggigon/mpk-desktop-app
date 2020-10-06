import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, MenuItem } from '@material-ui/core';

import clsx from 'clsx';
import colorForBoardButton from '@material-ui/core/colors/lime';

import { useSelector, useDispatch } from 'react-redux';
import { createBoard, deleteBoard } from '../features/board/boardSlice';
import { switchToBoard } from '../features/app/appSlice';
import { isBlank } from '../utils/stringUtils';
import styles from './SideBar.css';
import CardsArchiveDialog from './dialogs/CardsArchiveDialog';

const selectBoards = (state: RootState) => {
  return state.boards;
};

const selectedBoard = (state: RootState) => {
  return state.app.selectedBoard;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SideBar() {
  const boards = useSelector(selectBoards);
  const selectedBoardId = useSelector(selectedBoard);

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [boardName, setBoardName] = React.useState();
  const [numberOfColumns, setNumberOfColumns] = React.useState(3);
  const [boardNameError, setBoardNameError] = React.useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const addBoard = () => {
    if (!isBlank(boardName)) {
      dispatch(createBoard({ title: boardName, numberOfColumns }));
      setOpen(false);
    } else {
      setBoardNameError(true);
    }
  };

  const switchBoard = (boardId) => {
    dispatch(switchToBoard(boardId));
  };

  const isSelectedBoard = (boardId, theOtherId) => {
    return boardId === theOtherId;
  };

  const handleBoardNameChange = (event) => {
    if (isBlank(event.target.value)) {
      setBoardNameError(true);
    } else {
      setBoardNameError(false);
    }
    setBoardName(event.target.value);
  };

  const handleClose = () => {
    setBoardNameError(false);
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

  const handleDeleteBoard = () => {
    handleCloseMenu();
    if (boards.allIds.length === 1) return;
    if (window.confirm('Are you sure, this operation is not reversible?')) {
      const newListOfIds = boards.allIds.slice();
      const indexOfRemovedBoard = boards.allIds.indexOf(selectedBoardId);
      newListOfIds.splice(indexOfRemovedBoard, 1);
      dispatch(switchToBoard(newListOfIds[0]));
      dispatch(deleteBoard(selectedBoardId));
    }
  };

  const handleCloseArchivesDialog = () => {
    setArchiveDialogOpen(false);
  };

  const handleOpenArchivesDialog = () => {
    setArchiveDialogOpen(true);
    setOpenMenu(false);
  };

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
              onClick={() => switchBoard(boardId)}
            >
              {String.fromCharCode(65 + index)}
            </Avatar>
          </ButtonBase>
        </Tooltip>
      ))}
      <Box className={styles.addBoard}>
        <Tooltip title="Create new Board" placement="right">
          <IconButton aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className={styles.boardMenu}>
        <IconButton onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openMenu}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleOpenArchivesDialog}>
            View archived cards
          </MenuItem>
          <MenuItem
            onClick={handleDeleteBoard}
            disabled={boards.allIds.length < 2}
          >
            Delete current board
          </MenuItem>
        </Menu>
      </Box>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
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
              New Board
            </Typography>
            <Button autoFocus color="inherit" onClick={addBoard}>
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '20px' }}>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Board name"
              variant="outlined"
              placeholder="Board name"
              fullWidth
              helperText="Board name can't be empty"
              onChange={handleBoardNameChange}
              error={boardNameError}
            />
          </div>
          <div>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Number of columns
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(event) => {
                  setNumberOfColumns(event.target.value);
                }}
                value={numberOfColumns}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Dialog>

      <CardsArchiveDialog
        open={archiveDialogOpen}
        onClose={handleCloseArchivesDialog}
        archive={boards.byId[selectedBoardId].archive}
        cards={boards.byId[selectedBoardId].cards}
      />
    </div>
  );
}
