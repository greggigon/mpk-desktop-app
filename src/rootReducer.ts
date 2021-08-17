import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import boardReducer from './features/board/boardSlice';
import appReducer from './features/app/appSlice';
import searchAndFilterReducer from './features/searchAndFilter/search';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    boards: boardReducer,
    app: appReducer,
    searchAndFilter: searchAndFilterReducer,
  });
}
