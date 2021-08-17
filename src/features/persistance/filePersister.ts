import path from 'path';
import fs from 'fs';
import {
  APP_FILE_NAME,
  SAVE_FILE_NAME,
  APP_SAVE_FOLDER_NAME,
  APP_SAVE_FOLDER_NAME_DEV,
} from './shared';

const createMiddleWare = (appDataPath, isDevelopment = false) => {
  const folderNameToUse = isDevelopment
    ? APP_SAVE_FOLDER_NAME_DEV
    : APP_SAVE_FOLDER_NAME;
  const appSaveFolder = path.join(appDataPath, folderNameToUse);
  const boardsFile = path.join(appSaveFolder, SAVE_FILE_NAME);
  const appFile = path.join(appSaveFolder, APP_FILE_NAME);

  const middleware = (store) => (next) => (action) => {
    next(action);
    if (action.type.startsWith('board/')) {
      fs.writeFileSync(boardsFile, JSON.stringify(store.getState().boards));
    }
    if (action.type.startsWith('app/')) {
      fs.writeFileSync(appFile, JSON.stringify(store.getState().app));
    }
  };

  return middleware;
};

export default createMiddleWare;
