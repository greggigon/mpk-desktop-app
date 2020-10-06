import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DarkIcon from '@material-ui/icons/Brightness4';
import BrightIcon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { switchTheme } from '../features/app/appSlice';

const selectTheme = (state: RootState) => {
  return state.app.theme;
};

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  const handleSwitchTheme = () => {
    if (currentTheme === 'dark') {
      dispatch(switchTheme('light'));
    } else {
      dispatch(switchTheme('dark'));
    }
  };
  const themeTitle =
    currentTheme === 'dark' ? 'Switch theme to light' : 'Switch theme to dark';

  return (
    <Tooltip title={themeTitle} placement="right" arrow>
      <IconButton onClick={handleSwitchTheme}>
        {currentTheme === 'dark' ? <BrightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
}
