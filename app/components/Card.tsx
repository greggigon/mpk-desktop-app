import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import { MoreVert, Flag, Alarm } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Menu, MenuItem, Paper, Chip, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import styles from './Card.css';
import CardTasks from './CardTasks';
import {
  deleteCard,
  archiveCard,
  flagCard,
  unflagCard,
} from '../features/board/boardSlice';
import { Card } from '../model/cards';
import { Tag } from '../model/board';
import { SelectedCardAndAction } from './viewModels';
import { isBlank } from '../utils/stringUtils';

const selectIfTagsShouldShow = (state: RootState): boolean => {
  const { showTagsOnCards } = state.app;
  if (showTagsOnCards === undefined) return false;
  return showTagsOnCards;
};

const selectIfTasksShouldShow = (state: RootState): boolean => {
  const { showTasksOnCards } = state.app;
  if (showTasksOnCards === undefined) return false;
  return showTasksOnCards;
};

interface KanbanCardProps {
  card: Card;
  index: number;
  hasArchive?: boolean;
  tags: Record<string, Tag>;
  onCardSelected: (cardAndAction: SelectedCardAndAction) => void;
  showDeadline?: boolean;
}

const KanbanCard: React.FunctionComponent<KanbanCardProps> = (
  props: KanbanCardProps
) => {
  const { card, index, hasArchive, tags, onCardSelected, showDeadline } = props;
  const { id, title, number } = card;
  const hasTags = card.tags && card.tags.length > 0;
  const isFlagged = card.flag && card.flag.status;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const showTagsOnCards = useSelector(selectIfTagsShouldShow);
  const showTasksOnCards = useSelector(selectIfTasksShouldShow);
  const open = Boolean(anchorEl);
  const hasDescription = !isBlank(card.description);
  const hasDeadline = card.deadline != null;
  const [deadlineColor, setDeadlineColor] = React.useState('inherit');
  const [deadlineTooltip, setDeadlineTooltip] = React.useState(
    'This card has a deadline'
  );
  const dispatch = useDispatch();

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const removeCard = () => {
    closeMenu();
    dispatch(deleteCard(id));
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editCard = () => {
    closeMenu();
    onCardSelected({ card, action: 'edit' });
  };

  const archiveTheCard = () => {
    closeMenu();
    dispatch(archiveCard(id));
  };

  const handleFlagIt = () => {
    closeMenu();
    dispatch(flagCard(id));
  };

  const handleUnflagIt = () => {
    closeMenu();
    dispatch(unflagCard(id));
  };

  const handleMoveCardToBoard = () => {
    onCardSelected({ card, action: 'moveBetweenBoard' });
    closeMenu();
  };

  React.useEffect(() => {
    if (card.deadline && showDeadline) {
      const deadlineString = new Date(card.deadline).toLocaleString();
      if (card.pastDeadline) {
        setDeadlineColor('secondary');
        const tooltip = `This card is past the deadline ${deadlineString}`;
        setDeadlineTooltip(tooltip);
      } else {
        setDeadlineColor('inherit');
        const tooltip = `This card has deadline of ${deadlineString}`;
        setDeadlineTooltip(tooltip);
      }
    }
  }, [card, showDeadline, deadlineColor]);

  return (
    <div>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.card}>
              {isFlagged && (
                <div className={styles.flagContainer}>
                  <Flag color="secondary" />
                </div>
              )}
              <div className={styles.title}>
                <Typography variant="subtitle1">{title}</Typography>
              </div>
              <div className={styles.extraIndicatorsContainer}>
                {hasDescription && (
                  <Tooltip
                    title="This card has more details in description"
                    placement="bottom"
                    arrow
                  >
                    <DescriptionIcon fontSize="small" />
                  </Tooltip>
                )}
                {showDeadline && hasDeadline && (
                  <Tooltip title={deadlineTooltip} placeholder="bottom" arrow>
                    <Alarm fontSize="small" color={deadlineColor} />
                  </Tooltip>
                )}
              </div>
              <div className={styles.deleteButton}>
                <IconButton onClick={openMenu}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={editCard}>Open</MenuItem>
                  {isFlagged ? (
                    <MenuItem onClick={handleUnflagIt}>Unflag it</MenuItem>
                  ) : (
                    <MenuItem onClick={handleFlagIt}>Flag it!</MenuItem>
                  )}
                  <Divider />
                  {hasArchive && (
                    <MenuItem onClick={archiveTheCard}>Archive</MenuItem>
                  )}
                  <MenuItem onClick={handleMoveCardToBoard}>
                    Move to board ...
                  </MenuItem>
                  <MenuItem onClick={removeCard}>Delete</MenuItem>
                </Menu>
                <div className={styles.cardNumber}>
                  <Typography variant="caption">{`#${number}`}</Typography>
                </div>
              </div>
            </div>
            {showTagsOnCards && hasTags && (
              <div className={styles.tagsContainer}>
                {card.tags.map((tagId) => (
                  <Chip
                    key={tags[tagId].id}
                    size="small"
                    label={tags[tagId].name}
                    className={styles.tagOnCard}
                    style={{ backgroundColor: tags[tagId].color }}
                  />
                ))}
              </div>
            )}
            {showTasksOnCards && (
              <CardTasks cardId={card.id} description={card.description} />
            )}
          </Paper>
        )}
      </Draggable>
    </div>
  );
};

KanbanCard.defaultProps = {
  showDeadline: true,
  hasArchive: false,
};

export default KanbanCard;
