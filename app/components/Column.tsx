import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Build } from '@material-ui/icons';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

import styles from './Column.css';
import Card from './Card';
import EditColumnDialog from './dialogs/EditColumnDialog';
import { Column as ColumnType } from '../model/board';
import { Card as CardType } from '../model/cards';

interface ColumnProps {
  column: ColumnType;
  index: number;
  isLastColumn: boolean;
  cards: Array<CardType>;
}

export default function Column(props: ColumnProps) {
  const { column, index, isLastColumn, cards } = props;
  const { title, id } = column;
  const [openEditColumn, setOpenEditColumn] = React.useState(false);

  return (
    <div className={clsx(styles.column, styles.columnsContainer)}>
      <div className={styles.columnHeader}>
        <IconButton onClick={() => setOpenEditColumn(true)}>
          <Build style={{ fontSize: 12 }} />
        </IconButton>
        <span>{title}</span>
        <span>{` (${cards.length})`}</span>
      </div>
      <Droppable droppableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            className={clsx(
              styles.cardsContainer,
              snapshot.isDraggingOver && styles.cardsContainerDraggedOver
            )}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, cardIndex) => (
              <Card
                title={card.title}
                id={card.id}
                key={card.id}
                index={cardIndex}
                hasArchive={isLastColumn}
                isFlagged={card.flag && card.flag.status}
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

// Column.propTypes = {
//   title: PropTypes.string.isRequired,
//   cards: PropTypes.arrayOf(PropTypes.object).isRequired,
//   id: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   isLastColumn: PropTypes.bool.isRequired,
//   limiting: PropTypes.bool,
//   limitNumber: PropTypes.number,
// };

// Column.defaultProps = {
//   limiting: false,
//   limitNumber: 0,
// };
