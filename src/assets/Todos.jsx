import React from 'react'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'

function Todos(props) {
    const [newTaskInput, setNewTaskInput] = React.useState('')
    const remainingTasks = props.taskList.filter(el => !el.isDone).length

    function handleTaskSubmit(event) {
        event.preventDefault()
        const newTask = newTaskInput.trim()
        props.setData(prev => {
            if (newTask in prev[props.currentProject]) {
                return prev
            }
            const updatedData = {
                ...prev
            }
            
             const newTaskObject = {
                id: uuidv4(),
                isDone: false,
                value:  newTask,
                parentProject: props.currentProject,
                isForToday: false
            }

            if (props.currentProject === 'For Today') {
                newTaskObject.isForToday = true
            }

            updatedData[props.currentProject] = {
                ...updatedData[props.currentProject],
                [newTaskObject.id] : newTaskObject
            }
            return updatedData
        })
        setNewTaskInput("")
    }

    function toggleIsDone(taskId, projectName) {
        const project = (projectName.target.dataset.parentProject)
        props.setData(prev => {
            const newData = {...prev}
            newData[project][taskId].isDone = !newData[project][taskId].isDone
            return newData
        })
    }

    function handleInputChange(event) {
        setNewTaskInput(event.target.value)
    }     

    function clearCompletedTasks() {
        props.setData(prev => {
            const newData = {...prev}
            if (props.currentProject === 'All Tasks' || props.currentProject === 'For Today')  {
                Object.values(prev).forEach(project => {
                    Object.values(project).forEach(task => {
                        if (task.isDone) {
                            delete newData[task.parentProject][task.id]
                        }
                    })
                })
            } else {
                const completedTasks = Object.values(newData[props.currentProject]).filter(el => el.isDone)
                completedTasks.forEach(task => delete newData[props.currentProject][task.id])
            }
            return newData
        })
    }

    function deleteProject() {
        props.setData(prev => {
            const newData = {...prev}
            if (props.currentProject === 'All Tasks' || props.currentProject === 'For Today')  {
                return prev
            } else {
                props.setCurrentProject('All Tasks')
                delete newData[props.currentProject]
            }
            return newData
        })
    }

    const taskElems = props.taskList.map(el => <Task 
                        key={el.id}
                        {...el}
                        clickHandler={(event) => toggleIsDone(el.id, event)}
                        setData={props.setData}
                            />)
    return (
        <div className="todo-list">
            <div className="todo-header">
                <h2 className="list-title">{props.currentProject}</h2>
                <p className="task-count">Remaining Tasks: {remainingTasks}</p>
            </div>
            <div className="todo-body">
                <div className="tasks">
                    {taskElems}
                </div>
                <div className="new-task-creator">
                    <form 
                        onSubmit={handleTaskSubmit}
                        autoComplete="off">
                        <input 
                        type="text"
                        className="new new-task"
                        placeholder="new task name"
                        aria-label="new task name"
                        name="task"
                        onChange={handleInputChange}
                        value={newTaskInput}
                        required
                        />
                        <button className="btn create" aria-label="create new task">+</button>
                    </form>
                </div>
                <div className="delete-list-tasks">
                    <button 
                    className="btn delete"
                    onClick={clearCompletedTasks}
                    >clear completed tasks</button>
                    <button 
                    className="btn delete" 
                    onClick={deleteProject}
                    >delete a project</button>
                </div>
            </div>
        </div>
    )
}

export default Todos