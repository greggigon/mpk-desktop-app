import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {
  Popover,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Search, SubdirectoryArrowLeft, Clear } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mousetrap from 'mousetrap';

import TagComponent from './Tag';
import { Tags, Tag, Board } from '../model/board';
import {
  filterOnTags,
  searchForText,
} from '../features/searchAndFilter/search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: 10,
    },
    input: {
      // marginLeft: theme.spacing(1),
      // flex: 1,
    },
    searchPopOver: {
      padding: 20,
      width: 700,
    },
    searchInput: {
      width: '100%',
    },
    searchSections: {
      margin: 20,
    },
    tags: {
      marginRight: 5,
    },
  })
);

const selectTags = (state: RootState): Tags => {
  const { selectedBoard } = state.app;
  const board: Board = state.boards.byId[selectedBoard];
  return board.tags;
};

const selectFilter = (state: RootState) => {
  const { searchAndFilter } = state;
  return searchAndFilter;
};

const addKeyboardShortcutHandling = (handler) => {
  mousetrap.bind(['command+g', 'ctrl+g'], () => {
    handler();
    return false;
  });
};

export default function SearchBox() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchRef = useRef();
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);
  const tags = useSelector(selectTags);
  const searchAndFilter = useSelector(selectFilter);
  const { search } = searchAndFilter;
  const filterTags = searchAndFilter.tags;
  const [searchText, setSearchText] = useState(search);
  const [submited, setSubmited] = useState(true);

  const toggleSearch = () => {
    setSearchPopoverOpen(!searchPopoverOpen);
  };

  addKeyboardShortcutHandling(toggleSearch);

  const tagSelectedForFiltering = (_, value) => {
    dispatch(filterOnTags({ tags: value }));
  };

  const searchFieldChanged = (event) => {
    setSearchText(event.target.value);
    setSubmited(false);
  };

  const submitSearchFilter = (event) => {
    event.preventDefault();
    dispatch(searchForText({ search: searchText }));
    setSubmited(true);
  };

  const onPopoverClose = () => {
    setSearchPopoverOpen(false);
    if (!submited) {
      setSearchText(search);
    }
  };

  const clearSeachText = () => {
    setSearchText('');
    dispatch(searchForText({ search: '' }));
    setSubmited(true);
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

  const searchTextAdornment = () => {
    if (!searchText || searchText === '') {
      return <></>;
    }
    return (
      <InputAdornment position="end">
        {submited ? (
          <IconButton size="small" onClick={clearSeachText}>
            <Clear fontSize="small" />
          </IconButton>
        ) : (
          <SubdirectoryArrowLeft color="disabled" />
        )}
      </InputAdornment>
    );
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={toggleSearch} size="small" ref={searchRef}>
        <Search fontSize="small" />
      </IconButton>

      <Popover
        open={searchPopoverOpen}
        onClose={onPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        anchorEl={searchRef.current}
      >
        <div className={classes.searchPopOver}>
          <div className={classes.searchSections}>
            <Typography variant="subtitle1" style={{ marginBottom: 20 }}>
              Show cards with tags or search for text in Titles and Descriptions
            </Typography>
            <Autocomplete
              disabled={search !== ''}
              multiple
              id="tags-outlined"
              options={Object.values(tags.byId)}
              getOptionLabel={(tag: Tag) => tag.name}
              filterSelectedOptions
              onChange={tagSelectedForFiltering}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Tags"
                />
              )}
              renderTags={tagComponentRender}
              value={filterTags}
            />
          </div>
          <div className={classes.searchSections}>
            <form onSubmit={submitSearchFilter}>
              <TextField
                value={searchText}
                onChange={searchFieldChanged}
                disabled={searchAndFilter.tags.length !== 0}
                className={classes.searchInput}
                id="input-with-icon-grid"
                placeholder="Search in Titles and Descriptions ..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchTextAdornment(),
                }}
              />
            </form>
          </div>
        </div>
      </Popover>
    </div>
  );
}
