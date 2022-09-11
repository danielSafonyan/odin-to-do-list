const newTaskForm = document.querySelector('#create-task');

newTaskForm.addEventListener('submit', createNewTask);

function createNewTask(event) {
    event.preventDefault();
    const taskInputField = event.target[0];
    // render a task
    console.log(taskInputField.value);
    // save a task into the project
    taskInputField.value = '';
}

function renderTask(taskObject) {
        // <div class="task">
        //     <input 
        //     type="checkbox"
        //     id="task-3"
        //     />
        //     <label for="task-3"><span class="custom-checkbox"></span>Get a job</label>
        // </div>

        const allTasks = document.querySelector('.tasks');

        const div = document.createElement('div');
        div.classList.add('task');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', taskObject.id);
        input.checked = taskObject.isDone;
        div.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', taskObject.id);

        const spanCheckBox = document.createElement('span');
        spanCheckBox.classList.add('custom-checkbox');

        label.appendChild(spanCheckBox);
        label.append(taskObject.title);

        div.appendChild(label);
        allTasks.appendChild(div);
}

const taskObjectPrototype = {
    title: "Get a high-paying job",
    id: 1,
    isDone: false
}