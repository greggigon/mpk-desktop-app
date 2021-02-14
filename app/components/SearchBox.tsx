import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Popover,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Search, SubdirectoryArrowLeft, Clear } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mousetrap from 'mousetrap';

import TagComponent from './Tag';
import { Tags, Tag, Board } from '../model/board';
import {
  filterOnTags,
  searchForText,
  clearSearchAndFilter,
  Filter,
} from '../features/searchAndFilter/search';
import classes from './SearchBox.css';

const selectTags = (state: RootState): Tags => {
  const { selectedBoard } = state.app;
  const board: Board = state.boards.byId[selectedBoard];
  return board.tags;
};

const selectFilter = (state: RootState) => {
  const { searchAndFilter } = state;
  return searchAndFilter;
};

const addSearchOpenKeyboardShortcut = (handler) => {
  mousetrap.bind(['command+g', 'ctrl+g'], () => {
    handler();
    return false;
  });
};

const addClearFilterKeyboardShorcut = (handler) => {
  mousetrap.bind(['command+shift+g', 'ctrl+shift+g'], () => {
    handler();
    return false;
  });
};

export default function SearchBox() {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);
  const tags = useSelector(selectTags);
  const searchAndFilter: Filter = useSelector(selectFilter);
  const { search } = searchAndFilter;
  const filterTags = searchAndFilter.tags;
  const [searchText, setSearchText] = useState(search);
  const [submited, setSubmited] = useState(true);

  const clearSeachText = () => {
    setSearchText('');
    dispatch(searchForText({ search: '' }));
    setSubmited(true);
  };

  const toggleSearch = () => {
    setSearchPopoverOpen(!searchPopoverOpen);
  };

  const clearAllFilters = () => {
    clearSeachText();
    dispatch(clearSearchAndFilter({}));
  };

  addSearchOpenKeyboardShortcut(toggleSearch);
  addClearFilterKeyboardShorcut(clearAllFilters);

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

  const contentOfFilter = () => {
    if (!searchAndFilter.filterOrSearch) {
      return (
        <Typography color="textSecondary">Search or filter ...</Typography>
      );
    }
    if (searchAndFilter.search && searchAndFilter.search !== '') {
      return (
        <Typography color="secondary">{searchAndFilter.search}</Typography>
      );
    }
    if (searchAndFilter.tags && searchAndFilter.tags.length > 0) {
      return searchAndFilter.tags.map((tag: Tag) => (
        <TagComponent
          label={tag.name}
          backgroundColor={tag.color}
          textColor={tag.textColor}
          key={tag.id}
          className={classes.tagComponent}
        />
      ));
    }
    return <></>;
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchDisplay}>
        <Tooltip title="Search and filter (Cmd/Control + G)" placement="top">
          <IconButton onClick={toggleSearch} size="small" ref={searchRef}>
            <Search
              fontSize="small"
              color={searchAndFilter.filterOrSearch ? 'secondary' : 'action'}
            />
          </IconButton>
        </Tooltip>
        <div style={{ paddingLeft: 20 }}>{contentOfFilter()}</div>
      </div>
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
          <div className={classes.searchSections}>
            <Typography variant="caption" color="textSecondary">
              Use Cmd/Ctrl + Shift + G keyboard shortcut to clear filter from
              anywhere in the application.
            </Typography>
          </div>
        </div>
      </Popover>
    </div>
  );
}
