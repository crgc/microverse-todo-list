import './style.css';
import { dragStart, dragOver, drop } from './dragandrop.js';
import { loadTasks, saveTasks, reorderTasks } from './task.js';
import taskCompleteOrPending from './checkbox.js';
import { addNewTask } from './crud.js';

const createElement = (name) => document.createElement(name);
const createElementWithClass = (name, clazz) => {
  const element = createElement(name);
  element.className = clazz;

  return element;
};

const createDivWithClass = (clazz) => createElementWithClass('div', clazz);
const createCheckMarkSpan = () => createElementWithClass('span', 'checkmark');
const createCheckBoxElement = (task, checkboxId) => {
  const checkboxElement = createElement('input');
  checkboxElement.setAttribute('type', 'checkbox');
  checkboxElement.setAttribute('name', `${checkboxId}`);
  checkboxElement.id = `${checkboxId}`;

  if (task.completed) {
    checkboxElement.setAttribute('checked', 'checked');
  }

  checkboxElement.addEventListener('change', taskCompleteOrPending);
  return checkboxElement;
};
const createDescriptionDiv = (task) => {
  let descriptionDivClass = 'to-do-list-task--description';
  if (task.completed) {
    descriptionDivClass += ' strikethrough';
  }

  const descriptionDiv = createDivWithClass(descriptionDivClass);
  descriptionDiv.id = `todo-list-task-description-${task.index}`;
  descriptionDiv.textContent = task.description;

  return descriptionDiv;
};

function buildTaskLeftElement(task) {
  const taskLeftElement = createDivWithClass('todo-list-task-left');

  /* Build checkbox */
  const checkboxId = `check-task-${task.index}`;

  const labelElement = createElementWithClass('label', 'container');
  labelElement.setAttribute('for', checkboxId);
  labelElement.appendChild(createCheckBoxElement(task, checkboxId));
  labelElement.appendChild(createCheckMarkSpan());

  /* Build description div */
  const descriptionDiv = createDescriptionDiv(task);

  taskLeftElement.appendChild(labelElement);
  taskLeftElement.appendChild(descriptionDiv);
  return taskLeftElement;
}

function buildTaskRightElement(task) {
  const taskRightElement = createDivWithClass('todo-list-task-right');
  const editElement = createElementWithClass('i', 'fa fa-ellipsis-v');
  editElement.setAttribute('id', `edit-task-${task.index}`);
  editElement.setAttribute('aria-hidden', 'true');
  editElement.addEventListener('click', (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.parentElement;
    const taskElement = parentElement.parentElement;

    const taskIndex = targetElement.id.substring('edit-task-'.length);
    const deleteElement = document.getElementById(`delete-task-${taskIndex}`);

    taskElement.classList.add('editable');
    targetElement.classList.add('hidden');
    deleteElement.classList.remove('hidden');
  });

  const deleteElement = createElementWithClass('i', 'fa fa-trash hidden');
  deleteElement.setAttribute('id', `delete-task-${task.index}`);
  deleteElement.setAttribute('aria-hidden', 'true');
  deleteElement.addEventListener('click', (e) => {
    const taskIndex = e.target.id.substring('delete-task-'.length);

    let tasks = loadTasks();
    tasks = tasks.filter((task) => task.index != taskIndex);
    
    let shiftedTasks = [];
    for(let i = 0; i< tasks.length; i++) {
      const task = tasks[i];
      shiftedTasks = shiftedTasks.concat({
        description: task.description,
        completed: task.completed,
        index: i +1
      });
    }

    saveTasks(shiftedTasks);
    displayTasks();
  });

  taskRightElement.appendChild(editElement);
  taskRightElement.appendChild(deleteElement);
  return taskRightElement;
}

function buildTaskElement(task) {
  const taskElement = createDivWithClass('todo-list-task draggable');
  taskElement.setAttribute('id', `todo-list-task-${task.index}`);
  taskElement.setAttribute('draggable', 'true');
  taskElement.appendChild(buildTaskLeftElement(task));
  taskElement.appendChild(buildTaskRightElement(task));

  taskElement.addEventListener('dragstart', dragStart, false);
  taskElement.addEventListener('dragover', dragOver, false);
  taskElement.addEventListener('drop', drop, false);

  return taskElement;
}

function updateDOM(todoListElement) {
  const mainTagElement = document.getElementsByTagName('main')[0];
  const todoListWrapperElement = document.getElementsByClassName('todo-list-wrapper')[0];
  const todoListContainerElement = document.getElementsByClassName('todo-list-container')[0];

  todoListContainerElement.appendChild(todoListElement);
  todoListWrapperElement.prepend(todoListContainerElement);
  mainTagElement.appendChild(todoListWrapperElement);
  document.body.appendChild(mainTagElement);
}

function displayTasks() {
  let tasks = loadTasks() || [
    { description: 'Prepare meal', completed: true, index: 3 },
    { description: 'Do the laundry', completed: false, index: 1 },
    { description: 'Work on Microverse project', completed: false, index: 2 },
  ];

  tasks = reorderTasks(tasks, ['index'], ['asc']);

  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = buildTaskElement(task);

    todoListElement.appendChild(taskElement);
  });

  saveTasks(tasks);
  updateDOM(todoListElement);
}

function setUpMainListeners() {
  const addNewTaskElement = document.getElementById('add-new-task');
  addNewTaskElement.addEventListener('click', () => {
    addNewTask(displayTasks);
  });

  const clearAllElement = document.getElementById('todo-list-clear-all');
  clearAllElement.addEventListener('click', () => {
    localStorage.setItem('tasks', null);
    document.getElementById('todo-list').innerHTML = '';
  });
}

setUpMainListeners();
displayTasks();