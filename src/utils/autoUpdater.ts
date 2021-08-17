import { autoUpdater } from 'electron-updater';
import { BrowserWindow } from 'electron';
import log from 'electron-log';

const updateApplication = (window: BrowserWindow) => {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('Initilising application and updates...');

  autoUpdater.checkForUpdatesAndNotify();
};

export default updateApplication;
