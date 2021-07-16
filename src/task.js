import _ from 'lodash'; /* eslint-disable-line */

function loadTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function reorderTasks(tasks) {
  return _.orderBy(tasks, ['index'], ['asc']);
}

export {
  loadTasks,
  saveTasks,
  reorderTasks,
};