import { ipcRenderer } from 'electron';
import { switchToBoard } from '../app/appSlice';
import { Board } from '../../model/board';

const handleBoardSwitch = (boards, boardId: string) => {
  const board: Board = boards.byId[boardId];
  ipcRenderer.send('board/board-changes', board.title);
};

const eventsMiddleware = (store) => (next) => (action) => {
  if (action.type === switchToBoard.type) {
    handleBoardSwitch(store.getState().boards, action.payload);
  }
  return next(action);
};

export default eventsMiddleware;
