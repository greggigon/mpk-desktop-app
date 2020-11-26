import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import { fade, makeStyles } from '@material-ui/core/styles';

import ConfirmDialog from './ConfirmDialog';
import { ArchiveEntry } from '../../model/board';
import {
  unarchiveCards,
  deleteFromArchive,
} from '../../features/board/boardSlice';

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
  table: {
    padding: 20,
    overflow: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '50%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  actionButton: {
    margin: 5,
  },
}));

interface CardsArchiveDialogProps {
  open: boolean;
  onClose: () => void;
  archive: Array<ArchiveEntry>;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const archivedOnSorter = (left: ArchiveEntry, right: ArchiveEntry): number => {
  return right.archivedOn - left.archivedOn;
};

const mapTableContent = (archive: Array<ArchiveEntry>) => {
  const sortedArchive =
    archive.length > 2 ? archive.slice().sort(archivedOnSorter) : archive;

  return sortedArchive.map((entry) => {
    const { card } = entry;
    return {
      number: card.number,
      title: card.title,
      archivedOn: new Date(entry.archivedOn).toLocaleString(),
      id: card.id,
    };
  });
};

export default function CardsArchiveDialog(props: CardsArchiveDialogProps) {
  const { open, onClose, archive } = props;
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState('');
  const [tableContent, setTableContent] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialContent = mapTableContent(archive);
    setTableContent(initialContent);
  }, [archive]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = new RegExp(`${searchTerm}`, 'igm');
    const filteredArchive = mapTableContent(archive).filter((entry) =>
      regex.test(entry.title)
    );
    setTableContent(filteredArchive);
  };

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  const onCheckboxSelected = (event) => {
    setSelectedCards({
      ...selectedCards,
      [event.target.name]: event.target.checked,
    });
  };

  const filteredOutSelectedCardIds = () => {
    return Object.entries(selectedCards)
      .filter((entry) => entry[1])
      .map((entry) => entry[0]);
  };

  const unarchiveSelectedCards = () => {
    const cardIds = filteredOutSelectedCardIds();
    dispatch(unarchiveCards(cardIds));
    setSelectedCards({});
  };

  const deleteCardsFromArchives = () => {
    setConfirmDeleteOpen(false);
    const cardIds = filteredOutSelectedCardIds();
    dispatch(deleteFromArchive(cardIds));
    setSelectedCards({});
  };

  const confirmDeleteFromArchives = () => {
    setConfirmDeleteOpen(true);
  };

  if (!open) return <></>;
  return (
    <Dialog
      fullScreen
      open={open}
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
            Archived cards
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.table}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<UnarchiveOutlinedIcon />}
            size="small"
            className={classes.actionButton}
            onClick={unarchiveSelectedCards}
          >
            Restore to board
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteForeverOutlinedIcon />}
            size="small"
            className={classes.actionButton}
            onClick={confirmDeleteFromArchives}
          >
            Delete forever
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Card title</TableCell>
                <TableCell width={180}>Archived on</TableCell>
                <TableCell width={130} />
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{`#${entry.number}`}</TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.archivedOn}</TableCell>
                  <TableCell>
                    <Checkbox
                      name={entry.id}
                      color="default"
                      onChange={onCheckboxSelected}
                      checked={
                        selectedCards[entry.id] !== undefined &&
                        selectedCards[entry.id]
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ConfirmDialog
        open={confirmDeleteOpen}
        onConfirm={deleteCardsFromArchives}
        onCancel={() => setConfirmDeleteOpen(false)}
        message="Are you sure you want to delete selected cards?"
        dialogTitle="Remove cards from Archives"
      />
    </Dialog>
  );
}
