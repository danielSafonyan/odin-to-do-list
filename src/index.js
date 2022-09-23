import Project from './Project.js';
import Task from './Task.js';
import view from './ViewController.js';
import data from './DataBase.js';
import currentProject from './CurrentProjectObserver.js';

// eslint-disable-next-line prefer-const

function createNewTask(event) {
  event.preventDefault();
  const taskInputField = event.target[0];
  const taskObject = new Task(taskInputField.value, currentProject.currentProjectID);
  view.addTask(taskObject);
  data.saveTask(taskObject);
  view.calculateRemainingTasks();
  taskInputField.value = '';
}

const newTaskForm = document.querySelector('#create-task');
newTaskForm.addEventListener('submit', createNewTask);

function clearCompletedTasks() {
  let completedTasks = [];
  if (currentProject.currentProjectID === 'all-tasks') {
    const allProjects = Object.values(data.cache);

    allProjects.forEach(
      (project) => {
        completedTasks = completedTasks.concat(Object.values(project.taskList));
      },
    );

    completedTasks = completedTasks.filter((task) => task.isDone === true);
  } else {
    completedTasks = Object.values(data.cache[currentProject.currentProjectID].taskList);
    completedTasks = completedTasks.filter((task) => task.isDone === true);
  }
  data.clearCompletedTasks(completedTasks);
  view.clearCompletedTasks(completedTasks);
}

const clearCompletedTasksBtn = document.querySelector('#clear-tasks');
clearCompletedTasksBtn.addEventListener('click', clearCompletedTasks);

function createNewProject(event) {
  event.preventDefault();
  const projectInputField = event.target[0];
  const projectObject = new Project(projectInputField.value);
  view.renderProject(projectObject);
  data.saveProject(projectObject);
  projectInputField.value = '';
}

const newProjectForm = document.querySelector('#create-project');
newProjectForm.addEventListener('submit', createNewProject);

function switchToDefaultProject() {
  document.querySelector(`#${currentProject.currentProjectID}`).remove();
  const newProjectDisplayed = document.querySelector('#all-tasks');
  newProjectDisplayed.classList.add('active-project');
  currentProject.currentProjectID = 'all-tasks';
  view.calculateRemainingTasks();
  view.removeAllTasks();
  view.renderAllTasks();
}

function deleteProject() {
  if (currentProject.currentProjectID === 'all-tasks') {
    return;
  }
  data.deleteProject();
  switchToDefaultProject();
}

const deleteProjectBtn = document.querySelector('#delete-project');
deleteProjectBtn.addEventListener('click', deleteProject);

view.calculateRemainingTasks();
view.renderAllProjects();
view.renderAllTasks();
