import data from './DataBase.js';
class ViewController {
    constructor() {
        if (ViewController.instance == null) {
            this.currentProject = 'all-tasks';
            this.taskArea = document.querySelector('.tasks');
            this.remainingTasksArea = document.querySelector('#remaining-tasks');
            ViewController.instance = this;
        }
        return ViewController.instance;
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
    renderProjectTasks(x) {
        this.removeAllTasks();
        const allTasks = Object.values(data.cache[this.currentProject].taskList);
        allTasks.forEach(task => this.addTask(task));
        document.querySelector('.list-title').innerText = data.cache[this.currentProject].title;
    }
    calculateRemainingTasks() {
        const numRemainingTasks = Object.values(data.cache[this.currentProject].taskList).filter(task => task.isDone == false).length;
        this.remainingTasksArea.innerText = numRemainingTasks;
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

const view = new ViewController(); 
Object.freeze(view);
export default view;
