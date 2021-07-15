import _ from 'lodash'; /* eslint-disable-line */
import './style.css';

const createElement = (name) => document.createElement(name);
const createElementWithClass = (name, clazz) => {
  const element = createElement(name);
  element.className = clazz;

  return element;
};

const createDivWithClass = (clazz) => createElementWithClass('div', clazz);
const getLabelInnerHTML = (task, checkboxId) => {
  let checkboxHTML = `<input type="checkbox" name="${checkboxId}" id="${checkboxId}">`;
  if (task.completed) {
    checkboxHTML = `<input type="checkbox" name="${checkboxId}" id="${checkboxId}" checked="checked">`;
  }

  return `${checkboxHTML} <span class="checkmark"></span>`;
};
const createDescriptionDiv = (task) => {
  let descriptionDivClass = 'to-do-list-task--description';
  if (task.completed) {
    descriptionDivClass += ' strikethrough';
  }

  const descriptionDiv = createDivWithClass(descriptionDivClass);
  descriptionDiv.textContent = task.description;

  return descriptionDiv;
};

function buildTaskLeftElement(task) {
  const taskLeftElement = createDivWithClass('todo-list-task-left');

  /* Build checkbox */
  const checkboxId = `check-task-${task.index}`;

  const labelElement = createElementWithClass('label', 'container');
  labelElement.setAttribute('for', checkboxId);
  labelElement.innerHTML = getLabelInnerHTML(task, checkboxId);

  /* Build description div */
  const descriptionDiv = createDescriptionDiv(task);

  taskLeftElement.appendChild(labelElement);
  taskLeftElement.appendChild(descriptionDiv);
  return taskLeftElement;
}

function buildTaskRightElement() {
  const taskRightElement = createDivWithClass('todo-list-task-right');
  taskRightElement.innerHTML = '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>';

  return taskRightElement;
}

function buildTaskElement(task) {
  const taskElement = createDivWithClass('todo-list-task');
  taskElement.appendChild(buildTaskLeftElement(task));
  taskElement.appendChild(buildTaskRightElement());

  return taskElement;
}

function updateDOM(todoListElement) {
  const mainTagElement = document.getElementsByTagName('main')[0];
  const todoListWrapperElement = document.getElementsByClassName('todo-list-wrapper')[0];

  todoListWrapperElement.prepend(todoListElement);
  mainTagElement.appendChild(todoListWrapperElement);
  document.body.appendChild(mainTagElement);
}

function loadTasks() {
  let tasks = [
    { description: 'Prepare meal', completed: true, index: 3 },
    { description: 'Do the laundry', completed: false, index: 1 },
    { description: 'Work on Microverse project', completed: false, index: 2 },
  ];

  tasks = _.orderBy(tasks, ['index'], ['asc']);

  const todoListElement = document.getElementById('todo-list');
  tasks.forEach((task) => {
    const taskElement = buildTaskElement(task);

    todoListElement.appendChild(taskElement);
  });

  updateDOM(todoListElement);
}

loadTasks();