import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Build } from '@material-ui/icons';
import { Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

import styles from './Column.css';
import Card from './Card';
import EditColumnDialog from './dialogs/EditColumnDialog';

export default function Column(props) {
  const { title, cards, id, index } = props;
  const [openEditColumn, setOpenEditColumn] = React.useState(false);

  return (
    <div className={clsx(styles.column, styles.columnsContainer)}>
      <div className={styles.columnHeader}>
        <IconButton onClick={() => setOpenEditColumn(true)}>
          <Build style={{fontSize: "12", color: "white"}} />
        </IconButton>
        <span>{title}</span>
        <span> ({cards.length})</span>
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
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <EditColumnDialog
        columnId={id}
        title={title}
        onClose={() => setOpenEditColumn(false)}
        open={openEditColumn}
      />
    </div>
  );
}
