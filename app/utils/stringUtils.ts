import { Task } from '../model/cards';

export const isBlank = (str: string) => {
  return !str || /^\s*$/.test(str);
};

// const checkboxRegex = /-.?\[(.*)\](.*)/gim;
const checkboxRegex = /^\s?[-|+|*]\s?\[(.*)\](?:\s)?(.*)/gim;

const matchToTask = (match, index): Task => {
  const done = match[1].trim().toLowerCase() === 'x';
  const content = match[2].trim();
  return { done, content, index };
};

export const extractTasks = (description: string): Array<Task> => {
  let match;
  const matches = [];
  do {
    match = checkboxRegex.exec(description);
    matches.push(match);
  } while (match);
  const tasks = matches.filter((m) => m != null).map(matchToTask);
  return tasks;
};

export default { isBlank };
