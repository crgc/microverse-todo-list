import _ from 'lodash';
import './style.css';

const createDiv = () => document.createElement('div');

function buildTaskElement(task) {
  const taskElement = createDiv();
  taskElement.className = 'todo-list-task';
  taskElement.textContent = task.description;

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
    { 'description': 'Prepare meal', 'completed': true, 'index': 3 },
    { 'description': 'Do the laundry', 'completed': false, 'index': 1 },
    { 'description': 'Work on Microverse project', 'completed': false, 'index': 2 }
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