import React from 'react';
import LocalOffer from '@material-ui/icons/LocalOffer';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { updateShowTagsOnCards } from '../features/app/appSlice';

const showTagsSelector = (state: RootState): boolean => {
  const result = state.app.showTagsOnCards;
  if (result === undefined) {
    return false;
  }
  return result;
};

export default function TagsSwitch() {
  const dispatch = useDispatch();
  const theTagsValue = useSelector(showTagsSelector);
  const [showTagsOnCards, setShowTagsOnCards] = React.useState(theTagsValue);

  const handleSwitch = (event) => {
    dispatch(updateShowTagsOnCards(!showTagsOnCards));
    setShowTagsOnCards(!showTagsOnCards);
  };

  const tooltipText = showTagsOnCards
    ? 'Hide tags on cards'
    : 'Show tags on cards';

  return (
    <div>
      <Tooltip arrow title={tooltipText} placement="right">
        <IconButton onClick={handleSwitch}>
          {showTagsOnCards ? <LocalOfferOutlinedIcon /> : <LocalOffer />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
