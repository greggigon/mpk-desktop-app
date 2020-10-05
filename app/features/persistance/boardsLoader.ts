import fs from 'fs';
import path from 'path';
import defaultBoard from './defaultBoard';
import { APP_FILE_NAME, APP_SAVE_FOLDER_NAME, SAVE_FILE_NAME } from './shared';

const checkFolderExistsAndCreateItIfNot = (path) => {
  if (!fs.existsSync(path) || !fs.lstatSync(path).isDirectory) {
    fs.mkdirSync(path);
  }
};

const checkSaveFileExistsAndCreateIfNot = (saveFile, defaultFileContent) => {
  if (!fs.existsSync(saveFile)) {
    fs.writeFileSync(saveFile, JSON.stringify(defaultFileContent));
  }
};

const prepareBoardsContent = () => {
  const byId = {};
  byId[`${defaultBoard.id}`] = defaultBoard;
  return {byId, allIds: [defaultBoard.id]};
};

const loadedData = (appDataPath: string) => {
  const appSaveFolder = path.join(appDataPath, APP_SAVE_FOLDER_NAME);
  checkFolderExistsAndCreateItIfNot(appSaveFolder);

  const boardsFile = path.join(appSaveFolder, SAVE_FILE_NAME);
  checkSaveFileExistsAndCreateIfNot(boardsFile, prepareBoardsContent());

  const appFile = path.join(appSaveFolder, APP_FILE_NAME);
  checkSaveFileExistsAndCreateIfNot(appFile, { selectedBoard: defaultBoard.id });

  const boards = JSON.parse(fs.readFileSync(boardsFile, 'UTF-8'));
  const app = JSON.parse(fs.readFileSync(appFile, 'UTF-8'));

  return { boards, app };
};

export default loadedData;
