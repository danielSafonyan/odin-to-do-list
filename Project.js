import generateID from './generateID';

export default class Project {
  constructor(projectTitle) {
    this.title = projectTitle;
    this.id = generateID(projectTitle);
    this.taskList = {};
  }
}
