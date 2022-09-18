import Project from './Project.js';
import view from './ViewController.js';

const DEFAULT_PROJECT = new Project('All Tasks');

class DataBase {
  constructor() {
    if (DataBase.instance ==  null) {
      this.cache = JSON.parse(localStorage.getItem('cache'));
      if (!this.cache) {
        this.cache = {};
        this.cache[DEFAULT_PROJECT.id] = DEFAULT_PROJECT;
        this.saveState();
      }
      DataBase.instance = this;
    }
    return DataBase.instance;
  }
  saveTask(taskObject) {
    this.cache[taskObject.projectID].taskList[taskObject.id] = taskObject;
    this.saveState();
  }
  changeIsDoneStatus(projectID, taskid, isDoneStatus) {
    this.cache[projectID].taskList[taskid].isDone = isDoneStatus;
    this.saveState();
  }
  clearCompletedTasks(completedTasks) {
        completedTasks.forEach(
            task => {
              console.log(this.cache[task.projectID].taskList);
              delete this.cache[task.projectID].taskList[task.id];
            }
        )
        this.saveState();
  }
  saveState() {
    localStorage.setItem('cache', JSON.stringify(this.cache));
  }
}

const data = new DataBase(); 
Object.freeze(data);
export default data;
