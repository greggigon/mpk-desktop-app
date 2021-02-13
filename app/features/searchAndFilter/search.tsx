import { createSlice } from '@reduxjs/toolkit';

const searchAndFilterSlice = createSlice({
  name: 'searchAndFilter',
  initialState: { filterOrSearch: false, tags: [], search: '' },
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
