import {Task, Project} from './Classes.js';

const DEFAULT_PROJECT = new Project('All Tasks');

let cache = JSON.parse(localStorage.getItem('cache'));

if (!cache) {
    cache = {};
    cache[DEFAULT_PROJECT.id] = DEFAULT_PROJECT;
}

window.addEventListener('click', () => {
    localStorage.setItem('cache', JSON.stringify(cache));
})

let currentProject = cache[DEFAULT_PROJECT.id];

