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
  let completedTasks = [];
  if (currentProject.currentProjectID === 'all-tasks') {
      const allProjects = Object.values(data.cache);
      
      allProjects.forEach(
          project => {
            completedTasks = completedTasks.concat(Object.values(project.taskList));
          },
      )
      completedTasks = completedTasks.filter(task => task.isDone == true);
  } else {
    completedTasks = Object.values(data.cache[currentProject.currentProjectID].taskList).filter(task => task.isDone == true);
  }
  
  data.clearCompletedTasks(completedTasks);
  view.clearCompletedTasks(completedTasks);
}

const newProjectForm = document.querySelector('#create-project');
newProjectForm.addEventListener('submit', createNewProject);

function createNewProject(event) {
  event.preventDefault();
  const projectInputField = event.target[0];
  const projectObject = new Project(projectInputField.value);
  view.renderProject(projectObject);
  data.saveProject(projectObject);
  projectInputField.value = '';
}

const deleteProjectBtn = document.querySelector('#delete-project');
deleteProjectBtn.addEventListener('click', deleteProject);
function deleteProject() {
  if (currentProject.currentProjectID === 'all-tasks') {
    return;
  }

  // delete project from  the  db
  data.deleteProject();
  // switch to 'all-tasks' project.
  // rewnder all the stuff 
  switchToDefaultProject();
}

view.calculateRemainingTasks();
view.renderAllProjects();
view.renderAllTasks()


// helper function - move all intoi a separate module
function switchToDefaultProject() {
  const currentProjectDisplayed = document.querySelector(`#${currentProject.currentProjectID}`).remove();
  const newProjectDisplayed = document.querySelector(`#all-tasks`);
  newProjectDisplayed.classList.add('active-project');
  currentProject.currentProjectID = 'all-tasks';
  view.calculateRemainingTasks();
  view.removeAllTasks()
  view.renderAllTasks()
}

