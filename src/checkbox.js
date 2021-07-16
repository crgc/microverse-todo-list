import { loadTasks, saveTasks } from './task.js';

export default function taskCompleteOrPending(e) {
  const checkbox = e.target;
  const taskIndex = checkbox.id.substring('check-task-'.length);
  const descriptionElement = document.getElementById(`todo-list-task-description-${taskIndex}`);

  if (checkbox.checked) {
    descriptionElement.classList.add('strikethrough');
  } else {
    descriptionElement.classList.remove('strikethrough');
  }

  const tasks = loadTasks();
  for (const i in tasks) { /* eslint-disable-line no-restricted-syntax */
    if (tasks[i].index == taskIndex) { /* eslint-disable-line eqeqeq */
      tasks[i].completed = !tasks[i].completed;
    }
  }

  saveTasks(tasks);
};