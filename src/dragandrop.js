import { loadTasks, saveTasks, reorderTasks } from './task.js';

let draggedElement = null;
function dragStart(e) {
  /* Set data */
  draggedElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function getIndexFromId(id) {
  return parseInt(id.substring('todo-list-task-'.length), 10);
}

function getDescriptionElement(index) {
  return document.getElementById(`todo-list-task-description-${index}`);
}

function updateCheckBoxElement(checkboxElement, newIndex) {
  const checkboxId = `check-task-${newIndex}`;
  checkboxElement.setAttribute('name', checkboxId);
  checkboxElement.id = checkboxId;

  checkboxElement.parentElement.setAttribute('for', checkboxId);
}

function getPositionFromIndex(index) {
  return index - 1;
}

function updateIndeces(draggedTaskIndex, overTaskIndex) {
  const draggedIndexPosition = getPositionFromIndex(draggedTaskIndex);
  const overIndexPosition = getPositionFromIndex(overTaskIndex);

  const tasks = loadTasks();
  tasks[draggedIndexPosition].index = overTaskIndex;
  tasks[overIndexPosition].index = draggedTaskIndex;

  saveTasks(reorderTasks(tasks));
}

function drop(e) {
  e.preventDefault();

  /* Get data */
  draggedElement.innerHTML = this.innerHTML;
  this.innerHTML = e.dataTransfer.getData('text/html');

  const draggedElementId = draggedElement.id;
  const overElementId = this.id;
  const draggedTaskIndex = getIndexFromId(draggedElementId);
  const overTaskIndex = getIndexFromId(overElementId);

  const draggedDescriptionElement = getDescriptionElement(draggedTaskIndex);
  const overDescriptionElement = getDescriptionElement(overTaskIndex);

  draggedDescriptionElement.id = `todo-list-task-description-${overTaskIndex}`;
  overDescriptionElement.id = `todo-list-task-description-${draggedTaskIndex}`;

  const draggedCheckboxElement = document.getElementById(`check-task-${draggedTaskIndex}`);
  const overCheckboxElement = document.getElementById(`check-task-${overTaskIndex}`);

  updateCheckBoxElement(draggedCheckboxElement, overTaskIndex);
  updateCheckBoxElement(overCheckboxElement, draggedTaskIndex);

  updateIndeces(draggedTaskIndex, overTaskIndex);
}

export {
  dragStart,
  dragOver,
  drop,
};