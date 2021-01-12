import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { createBoard } from '../../features/board/boardSlice';
import { isBlank } from '../../utils/stringUtils';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface NewBoardDialogProps {
  close: () => void;
}

export default function NewBoardDialog(props: NewBoardDialogProps) {
  const { close } = props;

  const [boardName, setBoardName] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [numberOfColumns, setNumberOfColumns] = React.useState(3);
  const [boardNameError, setBoardNameError] = React.useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    setDialogOpen(false);
    close();
  };

  const addBoard = () => {
    if (!isBlank(boardName)) {
      dispatch(createBoard({ title: boardName, numberOfColumns }));
      handleClose();
    } else {
      setBoardNameError(true);
    }
  };

  const handleBoardNameChange = (event) => {
    if (isBlank(event.target.value)) {
      setBoardNameError(true);
    } else {
      setBoardNameError(false);
    }
    setBoardName(event.target.value.trim());
  };

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
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
  );
}
