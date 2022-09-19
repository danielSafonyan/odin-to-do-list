class CurrentProjectObserver {
    constructor() {
        if (CurrentProjectObserver.instance == null) {
            this._currentProjectID = 'all-tasks';
            this.subscribers = [];
            CurrentProjectObserver.instance = this;
        }
        return CurrentProjectObserver.instance;
    }

    subscribe(observer) {
        this.subscribers.push(observer);
    }

    unsubscribe(observer) {
        const observerIndex = this.subscribers.indexOf(observer);
        if (observerIndex > -1) {
            this.subscribers.splice();
        }  else {
            console.log(`${observer} is not listening.`);
        }
    }

    notifyAll() {
        this.subscribers.forEach(
            (subscriber) => subscriber.currentProjectID = this._currentProjectID,
        )
    }

    set currentProjectID(projectID) {
        this._currentProjectID = projectID;
        this.notifyAll();
    }

    get currentProjectID() {
        return this._currentProjectID;
    }
}


const currentProject = new CurrentProjectObserver(); 
Object.seal(currentProject);
export default currentProject;