import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: [],
  reducers: {
    switchToBoard(state, action) {
      const selectedBoardId = action.payload;
      state.selectedBoard = selectedBoardId;
    },
    switchTheme(state, action) {
      const theme = action.payload;
      state.theme = theme;
    },
  },
});

export const { switchToBoard, switchTheme } = appSlice.actions;
export default appSlice.reducer;
