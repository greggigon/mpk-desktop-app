import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';

import { history, configuredStore } from './store';
import loader from './features/persistance/boardsLoader';
import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const initiateApplication = (configuration) => {
  // eslint-disable-next-line global-require
  const loadedAppData = loader(configuration.appDataFolder);
  const store = configuredStore({boards: loadedAppData.boards, app: loadedAppData.app}, configuration.appDataFolder);

  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
};

ipcRenderer.on('window-loaded-configuration', (event, configuration) => {
  initiateApplication(configuration);
});
