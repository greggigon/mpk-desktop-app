import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {
    switchToBoard(state, action) {
      const selectedBoardId = action.payload;
      state.selectedBoard = selectedBoardId;
    },
    switchTheme(state, action) {
      const theme = action.payload;
      state.theme = theme;
    },
    updateShowTagsOnCards(state, action) {
      const showTagsOnCards = action.payload;
      state.showTagsOnCards = showTagsOnCards;
    },
    updateShowTasksOnCards(state, action) {
      const showTasksOnCards = action.payload;
      state.showTasksOnCards = showTasksOnCards;
    },
  },
});

export const {
  switchToBoard,
  switchTheme,
  updateShowTagsOnCards,
  updateShowTasksOnCards,
} = appSlice.actions;
export default appSlice.reducer;
