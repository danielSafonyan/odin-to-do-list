const newTaskForm = document.querySelector('#create-task');

newTaskForm.addEventListener('submit', createNewTask);

const projectObjectPrototype = {
    title: 'Programming',
    id: 'programming',
    tasks: {}
}

class Project {
    constructor(projectTitle) {
        this.title = projectTitle,
        this.id = generateID(projectTitle),
        this.taskList = {}
    }
}

class Task {
    constructor(taskTitle) {
        this.title = taskTitle,
        this.id = generateID(taskTitle),
        this.isDone  = false
    }
}

let allTasksProject = new Project('All Tasks');
let task1 = new Task("Get a job");
let task2 = new Task("Get car");
let task3 = new Task("Get a girlfriend");

allTasksProject.taskList[task1.id] = task1;
allTasksProject.taskList[task2.id] = task2;
allTasksProject.taskList[task3.id] = task3;

let currentProject = allTasksProject;

function createNewTask(event) {
    event.preventDefault();
    const taskInputField = event.target[0];
    const taskTitle = taskInputField.value;
    // create a task object
    const taskObject = new Task(taskTitle);
    // render a task
    renderTask(taskObject)
    // save a task into the project
    saveTask(taskObject)
    taskInputField.value = '';
}

function renderTask(taskObject) {
        const div = document.createElement('div');
        div.classList.add('task');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', taskObject.id);
        input.checked = taskObject.isDone;
        div.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', taskObject.id);

        const spanCheckBox = document.createElement('span');
        spanCheckBox.classList.add('custom-checkbox');

        label.appendChild(spanCheckBox);
        label.append(taskObject.title);

        div.addEventListener('click', changeIsDoneStatus);

        div.appendChild(label);

        const allTasks = document.querySelector('.tasks');
        allTasks.appendChild(div);
}

function saveTask(taskObject) {
    currentProject.taskList[taskObject.id] = taskObject;
}

const taskObjectPrototype = {
    title: "Get a high-paying job",
    id: 1,
    isDone: false
}

function generateID(string) {
    return string.toLowerCase().trim().replaceAll(' ','-');
}

function clearTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.remove());
}

function renderProjectTasks() {
    const allTasks = Object.values(currentProject.taskList);
    allTasks.forEach(task => renderTask(task));
}

function changeIsDoneStatus(event) {
    event.preventDefault();
    const checkBox = event.currentTarget.querySelector('input');
    checkBox.checked = checkBox.checked ?  false : true;
    const currentTask = event.currentTarget.querySelector('input').getAttribute('id');
    currentProject.taskList[currentTask].isDone = checkBox.checked;
}

function clearCompletedTasks() {
    const allTasks = Object.values(currentProject.taskList);
    allTasks.forEach(task => {
        if (task.isDone) {
            const thisTask = document.querySelector(`#${task.id}`);
            thisTask.parentElement.remove();
            delete currentProject.taskList[task.id];
        }
    })
}

const clearTasksButton = document.querySelector('#clear-tasks');
clearTasksButton.addEventListener('click', clearCompletedTasks);

renderProjectTasks();