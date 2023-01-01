import generateID from './generateID.js';

export default class Project {
  constructor(projectTitle) {
    this.title = projectTitle;
    this.id = generateID(projectTitle);
    this.taskList = {};
  }
}
