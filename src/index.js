import _ from 'lodash';
import './style.css';

const createDiv = () => document.createElement('div');
const createTaskDiv = (task) => {
  const taskDiv = createDiv();

  taskDiv.textContent = task.description;
  taskDiv.className = `task ${task.completed ? 'completed' : 'pending'}`;

  return taskDiv;
};

function loadTasks() {
  let tasks = [
    { 'description': 'Prepare meal', 'completed': true, 'index': 3 },
    { 'description': 'Do the laundry', 'completed': false, 'index': 1 },
    { 'description': 'Work on Microverse project', 'completed': false, 'index': 2 }
  ];

  tasks = _.orderBy(tasks, ['index'], ['asc']);

  const todoListElement = document.getElementById('todo-list');
  tasks.forEach((task) => {
    const taskDiv = createTaskDiv(task);

    todoListElement.appendChild(taskDiv);
  });

  document.body.appendChild(todoListElement);
}

loadTasks();