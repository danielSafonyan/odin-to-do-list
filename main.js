import Project from './Project.js';
import Task from './Task.js';
import view from './ViewController.js';
import data from './DataBase.js';
import currentProject from './CurrentProjectObserver.js';


// eslint-disable-next-line prefer-const

const newTaskForm = document.querySelector('#create-task');
newTaskForm.addEventListener('submit', createNewTask);

function createNewTask(event) {
  event.preventDefault();
  const taskInputField = event.target[0];
  const taskObject = new Task(taskInputField.value, currentProject.currentProjectID);
  view.addTask(taskObject);
  data.saveTask(taskObject);
  view.calculateRemainingTasks();
  taskInputField.value = '';
}

const clearCompletedTasksBtn = document.querySelector('#clear-tasks');
clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks);

function clearCompletedTasks() {
  const completedTasks = Object.values(data.cache[currentProject.currentProjectID].taskList).filter(task => task.isDone == true);
  data.clearCompletedTasks(completedTasks);
  view.clearCompletedTasks(completedTasks);
}

const newProjectForm = document.querySelector('#create-project');
newProjectForm.addEventListener('submit', createNewProject);

function createNewProject(event) {
  event.preventDefault();
  const projectInputField = event.target[0];
  const projectObject = new Project(projectInputField.value);
  view.addProject(projectObject);
  // data.saveProject(projectObject);
  // taskInputField.value = '';
}

view.renderProjectTasks();
view.calculateRemainingTasks();

