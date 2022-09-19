import data from './DataBase.js';
import currentProject from './CurrentProjectObserver.js';

class ViewController {
    constructor() {
        if (ViewController.instance == null) {
            this.currentProjectID = 'all-tasks'
            this.taskArea = document.querySelector('.tasks');
            this.remainingTasksArea = document.querySelector('#remaining-tasks');
            this.projectArea = document.querySelector('.dynamic.project-list');
            ViewController.instance = this;
        }
        return ViewController.instance;
    }

    updateCurrentProject(currentProjectID) {
        this.currentProjectID = currentProjectID;
        console.log("i am ", ViewController, 'my current project is');
    console.log(this.currentProjectID)
      }

    addTask(taskObject) {
        const div = document.createElement('div');
        div.classList.add('task');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', taskObject.id);
        input.setAttribute('project-id', taskObject.projectID);
        input.checked = taskObject.isDone;
        div.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', taskObject.id);

        const spanCheckBox = document.createElement('span');
        spanCheckBox.classList.add('custom-checkbox');

        label.appendChild(spanCheckBox);
        label.append(taskObject.title);

        // should be in DB class
        // div.addEventListener('click', changeIsDoneStatus);

        div.appendChild(label);
        div.addEventListener('click', taskClickEvent);

        this.taskArea.appendChild(div);
    }
    removeAllTasks() {
        const allTasks = document.querySelectorAll('.task');
        allTasks.forEach(task => task.remove());
    }
    renderProjectTasks() {
        this.removeAllTasks();
        const allTasks = Object.values(data.cache[this.currentProjectID].taskList);
        allTasks.forEach(task => this.addTask(task));
        document.querySelector('.list-title').innerText = data.cache[this.currentProjectID].title;
    }
    calculateRemainingTasks() {
        const numRemainingTasks = Object.values(data.cache[this.currentProjectID].taskList).filter(task => task.isDone == false).length;
        this.remainingTasksArea.innerText = numRemainingTasks;
    }
    clearCompletedTasks(completedTasks) {
        completedTasks.forEach(
            task => {
                document.querySelector(`#${task.id}`).parentElement.remove();
            }
        )
    }
    addProject(projectObject) {
        const li = document.createElement('li');
        li.classList.add('project');
        li.setAttribute('id', projectObject.id);
        li.innerText = projectObject.title;

        li.addEventListener('click', projectClickEvent);
        this.projectArea.appendChild(li);
    }
}

function taskClickEvent(event) {
    event.preventDefault();
    const checkBox = event.currentTarget.querySelector('input');
    checkBox.checked = checkBox.checked ?  false : true;
    const taskid = event.currentTarget.querySelector('input').getAttribute('id');
    let projectID = event.currentTarget.querySelector('input').getAttribute('project-id');
    data.cache[projectID].taskList[taskid].isDone = checkBox.checked;
    data.changeIsDoneStatus(projectID, taskid, checkBox.checked)
    view.calculateRemainingTasks();
  }


  const allTasksProject = document.querySelector('#all-tasks');
  allTasksProject.addEventListener('click', projectClickEvent);

  function projectClickEvent(event) {
    event.preventDefault();
    // what is data.currentProject
    if (data[this.currentProjectI] === event.currentTarget.id) {
        console.log("the same project");
        return;
    }
    const currentProjectDisplayed = document.querySelector(`#${currentProject.currentProjectID}`);
    console.log(`#${currentProject.currentProjectID}`);
    currentProjectDisplayed.classList.remove('active-project');
    const newProjectDisplayed = document.querySelector(`#${event.currentTarget.id}`);
    newProjectDisplayed.classList.add('active-project');
    currentProject.currentProjectID = event.currentTarget.id;
  }

const view = new ViewController(); 
Object.seal(view);
currentProject.subscribe(view);
export default view;
