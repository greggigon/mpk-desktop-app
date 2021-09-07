import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

const updateApplication = () => {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('Initilising application and updates...');

  autoUpdater.checkForUpdatesAndNotify();
};

export default updateApplication;
