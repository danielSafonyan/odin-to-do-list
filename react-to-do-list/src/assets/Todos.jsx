import React from 'react'

function Todos() {
    return (
        <div class="todo-list">
            <div class="todo-header">
                <h2 class="list-title">All Tasks</h2>
                <p class="task-count">Remaining Tasks: <span id="remaining-tasks"></span></p>
            </div>
            <div class="todo-body">
                <div class="tasks">
                    <div class="task">
                        <input 
                        type="checkbox"
                        id="task-1"
                        />
                        <label for="task-1"><span class="custom-checkbox"></span>Finish todo list</label>
                    </div>
                    <div class="task">
                        <input 
                        type="checkbox"
                        id="task-2"
                        />
                        <label for="task-2"><span class="custom-checkbox"></span>Create a portfolio</label>
                    </div>
                    <div class="task">
                        <input 
                        type="checkbox"
                        id="task-3"
                        />
                        <label for="task-3"><span class="custom-checkbox"></span>Get a job</label>
                    </div>
               
                </div>
                <div class="new-task-creator">
                    <form action="" id="create-task" autocomplete="off">
                        <input 
                        type="text"
                        class="new new-task"
                        placeholder="new task name"
                        aria-label="new task name"
                        name="task"
                        required
                        />
                        <button class="btn create" aria-label="create new task">+</button>
                    </form>
                </div>
                <div class="delete-list-tasks">
                    <button class="btn delete" id="clear-tasks">clear completed tasks</button>
                    <button class="btn delete" id="delete-project">delete a project</button>
                </div>
            </div>
        </div>
    )
}

export default Todos