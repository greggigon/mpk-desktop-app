import React from 'react';
import { LibraryAddCheck, LibraryAddCheckOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { updateShowTasksOnCards } from '../features/app/appSlice';

const showTasksSelector = (state: RootState): boolean => {
  const result = state.app.showTasksOnCards;
  if (result === undefined) {
    return false;
  }
  return result;
};

export default function TagsSwitch() {
  const dispatch = useDispatch();
  const theTagsValue = useSelector(showTasksSelector);
  const [showTasksOnCards, setShowTasksOnCards] = React.useState(theTagsValue);

  const handleSwitch = () => {
    dispatch(updateShowTasksOnCards(!showTasksOnCards));
    setShowTasksOnCards(!showTasksOnCards);
  };

  const tooltipText = showTasksOnCards
    ? 'Hide tasks on cards'
    : 'Show tasks on cards';

  return (
    <div>
      <Divider />
      <Tooltip arrow title={tooltipText} placement="right">
        <IconButton onClick={handleSwitch}>
          {showTasksOnCards ? <LibraryAddCheckOutlined /> : <LibraryAddCheck />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
