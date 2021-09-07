/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Build } from '@material-ui/icons';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

import styles from './Column.css';
import Card from './DraggableCard';
import EditColumnDialog from './dialogs/EditColumnDialog';
import { Column as ColumnType, Tag } from '../model/board';
import { Card as CardType } from '../model/cards';
import { SelectedCardAndAction } from './viewModels';
import { RootState } from '../store';
import { Filter } from '../features/searchAndFilter/search';
import {
  filterCardByTags,
  searchCardsByText,
} from '../features/searchAndFilter/filterOperations';

interface ColumnProps {
  column: ColumnType;
  index: number;
  isLastColumn: boolean;
  cards: Array<CardType>;
  tags: Record<string, Tag>;
  onCardSelected: (cardAndAction: SelectedCardAndAction) => void;
}

const stylesForColumn = (theme) => {
  return {
    columnLimitReached: {
      borderColor: theme.palette.warning.main,
    },
  };
};
const useStyles = makeStyles((theme) => stylesForColumn(theme));

const selectFilter = (state: RootState): Filter => {
  return state.searchAndFilter;
};

const filterCards = (
  cards: Array<CardType>,
  filter: Filter
): Array<CardType> => {
  if (filter.filterOrSearch) {
    if (filter.search && filter.search !== '') {
      return searchCardsByText(cards, filter.search);
    }
    if (filter.tags && filter.tags.length > 0) {
      return filterCardByTags(cards, filter.tags);
    }
  }
  return cards;
};

export default function Column(props: ColumnProps) {
  const { column, index, isLastColumn, cards, tags, onCardSelected } = props;
  const { title, id } = column;
  const filter = useSelector(selectFilter);
  const [openEditColumn, setOpenEditColumn] = React.useState(false);
  const [isDropDisabled, setIsDropDisabled] = React.useState(false);
  const classesForColumn = useStyles();
  const filteredCards = filterCards(cards, filter);

  React.useEffect(() => {
    if (column.options?.limiting) {
      setIsDropDisabled(cards.length >= (column.options.limitNumber as number));
    }
  }, [cards, column]);

  const cardsCounter = column.options?.limiting
    ? `${cards.length} of ${column.options.limitNumber}`
    : `${cards.length}`;

  return (
    <div className={clsx(styles.column, styles.columnsContainer)}>
      <div className={styles.columnHeader}>
        <IconButton onClick={() => setOpenEditColumn(true)}>
          <Build style={{ fontSize: 12 }} />
        </IconButton>
        <span>{title}</span>
        <span>{` (${cardsCounter})`}</span>
      </div>
      <Droppable droppableId={id} index={index} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            className={clsx(
              styles.cardsContainer,
              isDropDisabled && classesForColumn.columnLimitReached,
              snapshot.isDraggingOver && styles.cardsContainerDraggedOver
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredCards.map((card, cardIndex) => (
              <Card
                card={card}
                key={card.id}
                index={cardIndex}
                hasArchive={isLastColumn}
                tags={tags}
                onCardSelected={onCardSelected}
                showDeadline={!isLastColumn}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {openEditColumn && (
        <EditColumnDialog
          onClose={() => setOpenEditColumn(false)}
          column={column}
        />
      )}
    </div>
  );
}
