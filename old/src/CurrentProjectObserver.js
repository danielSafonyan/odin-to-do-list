class CurrentProjectObserver {
  #currentProjectID = 'all-tasks';

  #subscribers = [];

  constructor() {
    if (CurrentProjectObserver.instance == null) {
      CurrentProjectObserver.instance = this;
    }
    // eslint-disable-next-line no-constructor-return
    return CurrentProjectObserver.instance;
  }

  subscribe(observer) {
    this.#subscribers.push(observer);
  }

  unsubscribe(observer) {
    const observerIndex = this.#subscribers.indexOf(observer);
    if (observerIndex > -1) {
      this.#subscribers.splice();
    }
  }

  notifyAll() {
    this.#subscribers.forEach(
      (subscriber) => subscriber.updateCurrentProject(this.#currentProjectID),
    );
  }

  set currentProjectID(projectID) {
    this.#currentProjectID = projectID;
    this.notifyAll();
  }

  get currentProjectID() {
    return this.#currentProjectID;
  }
}

const currentProject = new CurrentProjectObserver(); 
// Object.seal(currentProject);
export default currentProject;
