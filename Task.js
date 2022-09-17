import generateID from './generateID';

export default class Task {
  constructor(taskTitle, projectID) {
    this.title = taskTitle;
    this.id = generateID(taskTitle);
    this.isDone = false;
    this.projectID = projectID;
  }
}
