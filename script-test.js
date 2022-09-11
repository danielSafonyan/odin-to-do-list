'use strict';

let currentTaskBox = document.querySelector('[data-box-name=all-tasks]');
let taskBoxes = getCurrentState("boxes");
const tasksTitle = document.querySelector('.list-title');
taskBoxes.forEach(task => task.addEventListener("click", changeCurrentTaskBox));

const cache = {};

function getCurrentState(type) {
    if (type === "boxes") {
        return document.querySelectorAll('[data-box-name]');
    } else if (type === "tasks") {
        return document.querySelectorAll('[data-box-name]');
    }
}

const projects = [];

class Project {
    constructor(projectName) {
        this.renderedName = projectName;
        this.dataName = convertToDataFormat(projectName);
        this.tasks = [];
    }
}

class Task {
    constructor(taskName) {
        this.renderedName = taskName;
        this.dataName = convertToDataFormat(taskName);
        this.isDone = false;
    }
}

const newTask = {
    renderedName: "My new Task",
    dataName: "my-new-task",
    isDone: false,
}

const allTasks = new Project("All Tasks");
const task1 = new Task("Get a job");
const task2 = new Task("Get a girlfriend");
task2.isDone = true;
const task3 = new Task("Get a house");
allTasks.tasks.push(task1);
allTasks.tasks.push(task2);
allTasks.tasks.push(task3);
const allTasksArray = [task1, task2, task3];

cache['all-tasks'] = allTasks;

function renderTasks() {
    clearTasks();
    const taskArray = cache[currentTaskBox.getAttribute("data-box-name")].tasks;
    
    for (const [idx, task] of taskArray.entries()) {
        createTask(task, idx);
    }
}

renderTasks()

function clearTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.remove());
}

function createTask(task, id) {
                    // <div class="task">
                    //     <input type="checkbox" id="task-1">
                    //     <label for="task-1"><span class="custom-checkbox"></span>Finish todo list</label>
                    // </div>
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('task');
    mainDiv.setAttribute("data-box-name", task.dataName);
    const inputEl = document.createElement('input');
    inputEl.setAttribute("type", 'checkbox');
    inputEl.setAttribute("id", `task-${id}`);
    inputEl.checked = task.isDone;
    mainDiv.appendChild(inputEl);
    const label = document.createElement('label');
    label.setAttribute("for", `task-${id}`);
    label.innerHTML = `<span class="custom-checkbox"></span>${task.renderedName}`;
    mainDiv.appendChild(label);

    const tasksContainer = document.querySelector('.tasks');
    tasksContainer.appendChild(mainDiv);
}


// function clearTasks() {
const renderedTaskList = document.querySelector('.tasks');

// }

function changeCurrentTaskBox(event) {
    const newSelectedElem = event.target;
    if (newSelectedElem === currentTaskBox) {
        return;
    }
    newSelectedElem.classList.add('active-task-box')
    currentTaskBox.classList.remove('active-task-box');
    currentTaskBox = newSelectedElem;
    
    tasksTitle.innerText = currentTaskBox.innerText;
    renderTasks(tasksTitle.innerText);
}

function renderProject(projectName) {
    const project = document.createElement('li');
    project.classList.add('task-box');
    project.innerText = projectName;
    project.setAttribute("data-box-name", convertToDataFormat(projectName));
    project.addEventListener('click', changeCurrentTaskBox);

    const projectListContainer = document.querySelector('.projects .task-list');
    projectListContainer.appendChild(project);
}

function convertToDataFormat(name) {
    return name.toLowerCase().trim().replaceAll(' ','-');
}

const addProjectForm = document.getElementById("create-project");
addProjectForm.addEventListener('submit', createProject);

function createProject(event) {
    event.preventDefault();
    const projectName = new FormData(event.target).get('project');
    renderProject(projectName);
    new Project(projectName);
    const projectField = document.querySelector('input[name="project"');
    projectField.value = '';
    taskBoxes = getCurrentState("boxes");
}

const addTaskForm = document.getElementById("create-task");
addTaskForm.addEventListener('submit', makeTask);

function makeTask(event) {
    event.preventDefault();
    const taskName = new FormData(event.target).get('task');
    createTask(new Task(taskName), cache[currentTaskBox.getAttribute("data-box-name")].tasks.length);
    const taskField = document.querySelector('input[name="task"');
    taskField.value = '';
    taskBoxes = getCurrentState("tasks");
}
