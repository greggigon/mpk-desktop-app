import { updateCardTask } from '../../../features/board/boardOperations';
import { Card, createCard } from '../../../model/cards';

describe('Update card task', () => {
  it('should complete a single task', () => {
    // Give a uncompleted task
    const card: Card = createCard('test card', '-[] test', [], 1);

    // When a task is updated to complete
    updateCardTask(card, 0, true);

    // Then the task is completed
    expect(card.description).toEqual('- [x] test');
  });

  it('should uncomplete a single task', () => {
    // Give a completed task
    const card: Card = createCard('test card', '-[x] test', [], 1);

    // When a task is updated to uncomplete
    updateCardTask(card, 0, false);

    // Then the task is uncompleted
    expect(card.description).toEqual('- [ ] test');
  });

  it('should complete a single task from list of tasks', () => {
    // Give a uncompleted task in a list of tasks
    const taskDescription = '-[] item 1\n- [] item 2\n- [] item 3';
    const card: Card = createCard('test card', taskDescription, [], 1);

    // When a task is updated to complete
    updateCardTask(card, 1, true);

    // Then specific task is completed
    expect(card.description).toEqual('-[] item 1\n- [x] item 2\n- [] item 3');
  });

  it('should uncomplete a single task from list of tasks', () => {
    // Give a uncompleted task in a list of tasks
    const taskDescription = '-[x] item 1\n- [x] item 2\n- [x] item 3';
    const card: Card = createCard('test card', taskDescription, [], 1);

    // When a task is updated to uncomplete
    updateCardTask(card, 1, false);

    // Then specific task is uncompleted
    expect(card.description).toEqual('-[x] item 1\n- [ ] item 2\n- [x] item 3');
  });

  it('should allow task to be updated which contains regex key characters', () => {
    // Give a completed task with brackets
    const taskDescription = '-[x] item 1 (additional info)';
    const card: Card = createCard('test card', taskDescription, [], 1);

    // When a task is updated to uncomplete
    updateCardTask(card, 0, false);

    // Then specific task is uncompleted
    expect(card.description).toEqual('- [ ] item 1 (additional info)');
  });
});
