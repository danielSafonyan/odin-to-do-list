import generateID from './generateID.js';

export class Task {
    constructor(taskTitle, projectID) {
        this.title = taskTitle,
        this.id = generateID(taskTitle),
        this.isDone  = false,
        this.projectID = projectID
    }
}

export class Project {
    constructor(projectTitle) {
        this.title = projectTitle,
        this.id = generateID(projectTitle),
        this.taskList = {}
    }
}