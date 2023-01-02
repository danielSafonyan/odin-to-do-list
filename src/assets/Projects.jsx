import React from 'react'

function Projects(props) { 
    const [newProjectInput, setNewProjectInput] = React.useState('')

    const projectListElems = props.projectList.map(el => {
        if (!(el === 'all-tasks')) {
            return <li 
                    key={el}
                    className={`project ${props.currentProject === el ? "active-project" : ''}`} data-project-name={el}
                    onClick={() => handleProjectClick(el)}
                    >{el}</li>
        }
    })

    function handleProjectClick(project) {
        props.setCurrentProject(project)
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        const newProjectName = newProjectInput.trim()
        props.setCurrentProject(newProjectName)
        props.setData(prev => {
            if (newProjectName in prev) {
                return prev
            }
            const updatedData = {
                ...prev,
                [newProjectName] : {}
            }
            return updatedData
        })
        setNewProjectInput("")
    }

    function handleInputChange(event) {
        setNewProjectInput(event.target.value)
    }

    return (
         <div className="all-tasks"> 
            <div className="inboxes">
                <ul className="project-list">
                    <li 
                    className={`project ${props.currentProject === 'all-tasks' ? "active-project" : ''}`}
                    data-project-name="all-tasks"
                    onClick={() => handleProjectClick('all-tasks')}
                    >All Tasks</li>
                </ul>
            </div>
            <div className="projects">
                <h2 className="project-list-title">My Projects</h2>
            <ul className="dynamic project-list">
                {projectListElems}
            </ul>
            <form 
                autoComplete="off"
                onSubmit={handleFormSubmit}
            >
                <input 
                    type="text"
                    className="new list"
                    placeholder="new project name"
                    aria-label="new project name"
                    required 
                    name="project"
                    maxLength="20"
                    value={newProjectInput}
                    onChange={handleInputChange}
                />
                <button  className="btn create" aria-label="create new project" type="button">+</button>
            </form>
            </div>
        </div>
        )
}

export default Projects