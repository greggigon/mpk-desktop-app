import { Filter } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../model/board';

export interface Filter {
  filterOrSearch: boolean;
  tags: Array<Tag>;
  search: string;
}

export const cleanFilter: Filter = {
  filterOrSearch: false,
  tags: [],
  search: '',
};

const searchAndFilterSlice = createSlice({
  name: 'searchAndFilter',
  initialState: cleanFilter,
  reducers: {
    filterOnTags(state, action) {
      const { tags } = action.payload;
      if (tags && tags.length > 0) {
        state.filterOrSearch = true;
        state.tags = tags;
      } else {
        state.filterOrSearch = false;
        state.tags = [];
      }
    },
    searchForText(state, action) {
      const { search } = action.payload;
      if (search && search.trim() !== '') {
        state.filterOrSearch = true;
        state.search = search;
      } else {
        state.filterOrSearch = false;
        state.search = '';
      }
    },
    clearSearchAndFilter(state, action) {
      state.filterOrSearch = false;
      state.tags = [];
      state.search = '';
    },
  },
});

export const {
  filterOnTags,
  searchForText,
  clearSearchAndFilter,
} = searchAndFilterSlice.actions;

export default searchAndFilterSlice.reducer;
