let cache = JSON.parse(localStorage.getItem('cache'));
console.log(cache);
if (!cache) {
    cache = {}
}

console.log(JSON.stringify(cache));

window.addEventListener('beforeunload', () => {
    localStorage.setItem('cache', JSON.stringify(cache));
})

function generateID(string) {
    return string.toLowerCase().trim().replaceAll(' ','-');
}

class Project {
    constructor(projectTitle) {
        this.title = projectTitle,
        this.id = generateID(projectTitle),
        this.taskList = {}
    }
}

// const projectObjectPrototype = {
//     title: 'Programming',
//     id: 'programming',
//     tasks: {}
// }

class Task {
    constructor(taskTitle, projectID) {
        this.title = taskTitle,
        this.id = generateID(taskTitle),
        this.isDone  = false,
        this.projectID = projectID
    }
}

let allTasksProject =  new Project('All Tasks');
let currentProject = allTasksProject;
cache[allTasksProject.id] = allTasksProject;

// const taskObjectPrototype = {
//     title: "Get a high-paying job",
//     id: 1,
//     isDone: false
// }

// let allTasksProject = new Project('All Tasks');
// let allTask1 = new Task("Get  Groceries", 'all-tasks');
// // let allTask2 = new Task("Get Lunch", 'all-tasks');
// // let allTask3 = new Task("Play Voley", 'all-tasks');

// allTasksProject.taskList[allTask1.id] = allTask1;
// allTasksProject.taskList[allTask2.id] = allTask2;
// allTasksProject.taskList[allTask3.id] = allTask3;

// let spanishProject = new Project('Spanish');
// let spTask1 = new Task("Learn subjuntivo", 'spanish');
// let spTask2 = new Task("Learn vocabulary", 'spanish');
// let spTask3 = new Task("Speak like a native", 'spanish');

// spanishProject.taskList[spTask1.id] = spTask1;
// spanishProject.taskList[spTask2.id] = spTask2;
// spanishProject.taskList[spTask3.id] = spTask3;

// let programmingProject = new Project('Programming');
// let prTask1 = new Task("Finish a track", 'programming');
// prTask1.isDone = true;
// let prTask2 = new Task("Create a portofolio", 'programming');
// let prTask3 = new Task("Get a job", 'programming');

// programmingProject.taskList[prTask1.id] = prTask1;
// programmingProject.taskList[prTask2.id] = prTask2;
// programmingProject.taskList[prTask3.id] = prTask3;

// cache[spanishProject.id] = spanishProject;
// cache[programmingProject.id] = programmingProject;
// cache[allTasksProject.id] = allTasksProject;

const newTaskForm = document.querySelector('#create-task');
newTaskForm.addEventListener('submit', createNewTask);

function createNewTask(event) {
    event.preventDefault();
    const taskInputField = event.target[0];
    const taskTitle = taskInputField.value;
    console.log(taskTitle);
    // create a task object
    const taskObject = new Task(taskTitle, currentProject.id);
    console.log(taskObject);
    // render a task
    renderTask(taskObject);
    // save a task into the project
    saveTask(taskObject);
    if (currentProject.id === 'all-tasks') {
        gatherAllTasks();
    } else {
        countRemainigTasks();
    }
    taskInputField.value = '';
}

function renderTask(taskObject) {
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

        div.addEventListener('click', changeIsDoneStatus);

        div.appendChild(label);

        const allTasks = document.querySelector('.tasks');
        allTasks.appendChild(div);
}

function saveTask(taskObject) {
    currentProject.taskList[taskObject.id] = taskObject;
}

function renderProjectTasks() {
    clearAllTasks();
    const allTasks = Object.values(currentProject.taskList);
    allTasks.forEach(task => renderTask(task));
    countRemainigTasks();
    document.querySelector('.list-title').innerText = currentProject.title;
}

function changeIsDoneStatus(event) {
    event.preventDefault();
    const checkBox = event.currentTarget.querySelector('input');
    checkBox.checked = checkBox.checked ?  false : true;
    const currentTask = event.currentTarget.querySelector('input').getAttribute('id');
    let changedCurrentProject = event.currentTarget.querySelector('input').getAttribute('project-id');
    cache[changedCurrentProject].taskList[currentTask].isDone = checkBox.checked;
    console.log(currentProject.id);
    if (currentProject.id === 'all-tasks') {
        gatherAllTasks();
    } else {
        countRemainigTasks();
    }
}

const clearTasksButton = document.querySelector('#clear-tasks');

clearTasksButton.addEventListener('click', clearCompletedTasks);

function clearAllTasks() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.remove());
}

function clearCompletedTasks() {
    if (currentProject.id === 'all-tasks') {
        let allTasks = [];
        for (const project of Object.values(cache)) {
            const projectTasks = Object.values(project.taskList)
            allTasks = allTasks.concat(projectTasks);
        }

        allTasks.forEach(task => {
            if (task.isDone) {
                delete cache[task.projectID].taskList[task.id];
                document.querySelector(`#${task.id}`).parentElement.remove();
            }
        })
        return;
    }
    const allTasks = Object.values(currentProject.taskList);
    allTasks.forEach(task => {
        if (task.isDone) {
            const thisTask = document.querySelector(`#${task.id}`);
            thisTask.parentElement.remove();
            delete currentProject.taskList[task.id];
        }
    })
}

renderProjectTasks();

const newProjectForm = document.querySelector('#create-project');
newProjectForm.addEventListener('submit', createNewProject);

function createNewProject(event) {
    event.preventDefault();
    const projectInputField = event.target[0];
    const projectTitle = projectInputField.value;
    // create a project object
    const projectObject = new Project(projectTitle);
    // render a project
    renderProject(projectObject)
    // save a project into the caceh
    saveProject(projectObject);
    projectInputField.value = '';
}

function renderProject(projectObject) {
    const li = document.createElement('li');
    li.classList.add('project');
    li.setAttribute('id', projectObject.id);
    li.innerText = projectObject.title;

    li.addEventListener('click', changeCurrentProject);

    const allProjects = document.querySelector('div.projects > ul.project-list');
    allProjects.appendChild(li);
}

function saveProject(projectObject) {
    cache[projectObject.id] = projectObject;
}


function changeCurrentProject(event) {
    // what is 
    if (currentProject.id === event.currentTarget.id) {
        console.log("the same project");
        return;
    }
    const currentProjectDisplayed = document.querySelector(`#${currentProject.id}`);
    currentProjectDisplayed.classList.remove('active-project');
    const newProjectDisplayed = document.querySelector(`#${event.currentTarget.id}`);
    newProjectDisplayed.classList.add('active-project');
    currentProject = cache[event.currentTarget.id];
    if (event.currentTarget.id === "all-tasks") {
        gatherAllTasks();
        return;
    } else {
        renderProjectTasks();
    }   
}

const allProjectsTest = document.querySelectorAll('.project');
allProjectsTest.forEach( project => project.addEventListener('click', changeCurrentProject));

function printCache() {
    console.log(JSON.stringify(cache));
}

function renderAllProjects() {
    const allProjects = Object.values(cache);
    for (const [idx, project] of allProjects.entries()) {
        if (project.id === "all-tasks") {
            continue;
        }
        renderProject(project);
        if (idx == 0) {
            document.querySelector(`#${project.id}`).classList.add('active-project');
        }
    }
}

renderAllProjects();
renderProjectTasks();
gatherAllTasks();

function countRemainigTasks(taskList) {
    let currentTaskList = Object.values(currentProject.taskList);
    if (taskList) {
        currentTaskList = taskList;
    } else {
        currentTaskList = Object.values(currentProject.taskList);
    }
    const finishedTasks = currentTaskList.filter(task => task.isDone == true);
    const tasksRemaining = currentTaskList.length - finishedTasks.length;
    document.querySelector('#remaining-tasks').innerText = tasksRemaining;
}

const deleteProjectButton = document.querySelector('#delete-project');
deleteProjectButton.addEventListener('click', deleteProject);

function deleteProject(event) {
    if (currentProject.id === "all-tasks") {
        return;
    }
    delete cache[currentProject.id];
    document.querySelector(`#${currentProject.id}`).remove();
    currentProject = cache[Object.keys(cache)[0]];
    if (currentProject == undefined) {
        clearAllTasks();
        document.querySelector('.list-title').innerText = 'You are done!';
        document.querySelector('.task-count').innerText = '';
        return;
    }
    document.querySelector(`#${currentProject.id}`).classList.add('active-project');
    gatherAllTasks();
}

function gatherAllTasks() {
    let allTasks = [];
    for (const project of Object.values(cache)) {
        const projectTasks = Object.values(project.taskList)
        allTasks = allTasks.concat(projectTasks);
    }
    clearAllTasks();
    allTasks.forEach(task => renderTask(task));
    document.querySelector('.list-title').innerText = currentProject.title;
    countRemainigTasks(allTasks);
}

function getAllTasksList() {
    let allTasks = [];
    Object.values(cache).forEach(
      (project) => {
        allTasks = allTasks.concat(Object.values(project.taskList));
      },
    );
  
    return allTasks;
  }
  