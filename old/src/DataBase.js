import Project from './Project.js';
import currentProject from './CurrentProjectObserver.js';

const DEFAULT_PROJECT = new Project('All Tasks');

class DataBase {
  constructor() {
    if (DataBase.instance == null) {
      this.cache = JSON.parse(localStorage.getItem('cache'));
      if (!this.cache) {
        this.cache = {};
        this.cache[DEFAULT_PROJECT.id] = DEFAULT_PROJECT;
        this.currentProjectID = DEFAULT_PROJECT.id;
        this.saveState();
      }
      DataBase.instance = this;
    }
    return DataBase.instance;
  }

  updateCurrentProject(currentProjectID) {
    this.currentProjectID = currentProjectID;
  }

  saveTask(taskObject) {
    this.cache[taskObject.projectID].taskList[taskObject.id] = taskObject;
    this.saveState();
  }

  saveProject(projectObject) {
    this.cache[projectObject.id] = projectObject;
    this.saveState();
  }

  deleteProject() {
    delete this.cache[currentProject.currentProjectID];
    this.saveState();
  }

  changeIsDoneStatus(projectID, taskid, isDoneStatus) {
    this.cache[projectID].taskList[taskid].isDone = isDoneStatus;
    this.saveState();
  }

  clearCompletedTasks(completedTasks) {
    completedTasks.forEach(
      (task) => {
        delete this.cache[task.projectID].taskList[task.id];
      },
    );
    this.saveState();
  }

  saveState() {
    localStorage.setItem('cache', JSON.stringify(this.cache));
  }
}

const data = new DataBase();
// Object.seal(data);
currentProject.subscribe(data);
export default data;
