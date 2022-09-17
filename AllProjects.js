import Project from './Project';

export default class AllProjects extends Project {
  getTaskList() {
    let allTasks = [];
    Object.values(AllProjects.cache).forEach(
      (project) => {
        allTasks = allTasks.concat(Object.values(project.taskList));
      },
    );

    return this;
  }
}
