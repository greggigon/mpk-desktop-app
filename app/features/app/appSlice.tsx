import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: [],
  reducers: {
    switchToBoard(state, action) {
      const selectedBoardId = action.payload;
      state.selectedBoard = selectedBoardId;
    },
  },
});

export const { switchToBoard } = appSlice.actions;
export default appSlice.reducer;
