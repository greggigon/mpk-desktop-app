import React from 'react';
import { useDispatch } from 'react-redux';

import { FormGroup, FormControlLabel, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Task } from '../model/cards';
import { extractTasks } from '../utils/stringUtils';
import { updateCardsTask } from '../features/board/boardSlice';

interface CardTasksProps {
  cardId: string;
  description: string;
}

export default function CardTasks(props: CardTasksProps) {
  const { description, cardId } = props;
  const tasks = extractTasks(description);
  const dispatch = useDispatch();
  const handleChange = (task: Task) => {
    dispatch(
      updateCardsTask({ cardId, taskIndex: task.index, taskDone: !task.done })
    );
  };

  if (tasks.length === 0) {
    return <></>;
  }

  const makeTask = (task: Task) => {
    const checkBox = (
      <Checkbox
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        name="checkedI"
        color="primary"
        onChange={() => handleChange(task)}
        checked={task.done}
      />
    );

    return (
      <FormControlLabel
        control={checkBox}
        label={<Typography variant="body2">{task.content}</Typography>}
        key={`${cardId}-${task.index}`}
      />
    );
  };

  return (
    <FormGroup style={{ marginLeft: 20, textAlign: 'left' }}>
      {tasks.map((task: Task) => makeTask(task))}
    </FormGroup>
  );
}
