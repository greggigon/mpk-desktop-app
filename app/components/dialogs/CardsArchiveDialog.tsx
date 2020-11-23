import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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

import { fade, makeStyles } from '@material-ui/core/styles';
import PropTypes, { InferProps } from 'prop-types';

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapTableContent = (archive) => {
  return archive.map((entry) => {
    const { card } = entry;
    if (!card) console.log(entry);
    return {
      number: card.number,
      title: card.title,
      archivedOn: new Date(entry.archivedOn).toLocaleString(),
      id: card.id,
    };
  });
};

export default function CardsArchiveDialog(
  props: InferProps<typeof CardsArchiveDialog.propTypes>
) {
  const { open, onClose, archive } = props;
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [tableContent, setTableContent] = React.useState([]);

  React.useEffect(() => {
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

  if (!open) return null;
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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Card title</TableCell>
                <TableCell width={200}>Archived on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableContent.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{`#${entry.number}`}</TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.archivedOn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
}

CardsArchiveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  archive: PropTypes.arrayOf(Object).isRequired,
};
