/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// // Lazily load routes and code split with webpack
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );
const createTheme = (palette = 'dark') =>
  createMuiTheme({ palette: { type: palette } });

const themeSelector = (state: RootState) => {
  return state.app.theme;
};

export default function Routes() {
  const currentTheme = useSelector(themeSelector);
  const theme = createTheme(currentTheme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App>
        <Switch>
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </App>
    </ThemeProvider>
  );
}
