import fs from 'fs';
import path from 'path';
import defaultBoard from './defaultBoard';
import { APP_FILE_NAME, APP_SAVE_FOLDER_NAME, SAVE_FILE_NAME } from './shared';
import migrate from './migrator';

const checkFolderExistsAndCreateItIfNot = (thePath) => {
  if (!fs.existsSync(thePath) || !fs.lstatSync(thePath).isDirectory) {
    fs.mkdirSync(thePath);
  }
};

const checkSaveFileExistsAndCreateIfNot = (saveFile, defaultFileContent) => {
  if (!fs.existsSync(saveFile)) {
    fs.writeFileSync(saveFile, JSON.stringify(defaultFileContent));
  }
};

const loadedData = (appDataPath: string) => {
  const appSaveFolder = path.join(appDataPath, APP_SAVE_FOLDER_NAME);
  checkFolderExistsAndCreateItIfNot(appSaveFolder);

  const boardsFile = path.join(appSaveFolder, SAVE_FILE_NAME);
  checkSaveFileExistsAndCreateIfNot(boardsFile, defaultBoard);

  const appFile = path.join(appSaveFolder, APP_FILE_NAME);
  checkSaveFileExistsAndCreateIfNot(appFile, {
    selectedBoard: defaultBoard.allIds[0],
    theme: 'dark',
    showTagsOnCards: false,
  });

  const boards = migrate(JSON.parse(fs.readFileSync(boardsFile, 'UTF-8')));
  const app = JSON.parse(fs.readFileSync(appFile, 'UTF-8'));

  return { boards, app };
};

export default loadedData;
