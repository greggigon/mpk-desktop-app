/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper } from '@material-ui/core';
import { Tag } from '../model/board';
import { SelectedCardAndAction } from './viewModels';
import KanbanCard from './Card';
import { Card } from '../model/cards';

interface KanbanCardProps {
  card: Card;
  index: number;
  hasArchive?: boolean;
  tags: Record<string, Tag>;
  onCardSelected: (cardAndAction: SelectedCardAndAction) => void;
  showDeadline?: boolean;
}

const DraggableCard: React.FunctionComponent<KanbanCardProps> = (
  props: KanbanCardProps
) => {
  const { card, index, hasArchive, tags, onCardSelected, showDeadline } = props;

  return (
    <div>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <KanbanCard
              card={card}
              hasArchive={hasArchive}
              tags={tags}
              onCardSelected={onCardSelected}
              showDeadline={showDeadline}
            />
          </Paper>
        )}
      </Draggable>
    </div>
  );
};

DraggableCard.defaultProps = {
  showDeadline: true,
  hasArchive: false,
};

export default DraggableCard;
