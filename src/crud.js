import { loadTasks, saveTasks, reorderTasks } from './task.js';

function addNewTask(refresh) {
  let tasks = loadTasks();
  
  const descriptionInputElement = document.getElementById('new-task-description');
  const taskDescription = descriptionInputElement.value;
  descriptionInputElement.value = '';

  tasks = tasks.concat({
    description: taskDescription,
    completed: false,
    index: tasks.length + 1
  });

  saveTasks(tasks);
  refresh();
}

export {
  addNewTask
}