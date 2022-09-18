// import Project from './Project.js';
import Task from './Task.js';
import view from './ViewController.js';
import data from './DataBase.js';

// eslint-disable-next-line prefer-const

const newTaskForm = document.querySelector('#create-task');
newTaskForm.addEventListener('submit', createNewTask);

function createNewTask(event) {
  event.preventDefault();
  const taskInputField = event.target[0];
  const taskObject = new Task(taskInputField.value, view.currentProject);
  view.addTask(taskObject);
  data.saveTask(taskObject);
  view.calculateRemainingTasks();
  taskInputField.value = '';
}

view.renderProjectTasks();
view.calculateRemainingTasks();

