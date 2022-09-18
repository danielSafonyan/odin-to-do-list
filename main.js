import Project from './Project.js';
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

const clearCompletedTasksBtn = document.querySelector('#clear-tasks');

clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks);

function clearCompletedTasks() {
  const completedTasks = Object.values(data.cache[view.currentProject].taskList).filter(task => task.isDone == true);
  data.clearCompletedTasks(completedTasks);
  view.clearCompletedTasks(completedTasks);
}

view.renderProjectTasks();
view.calculateRemainingTasks();

