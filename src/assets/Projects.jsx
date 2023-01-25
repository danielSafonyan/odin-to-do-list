import React from 'react'

function Projects(props) { 
    const [newProjectInput, setNewProjectInput] = React.useState('')

    const defaultProjectListElems = Object.values(props.DEFAULT_PROJECTS).map(el => getProjectEl(el))

    const projectListElems = props.projectList.map(el => {
        const isDefaultProject = Object.values(props.DEFAULT_PROJECTS).includes(el)
        if (!isDefaultProject) {
            return getProjectEl(el)
        }
    })

    function getProjectEl(projectName) {
        const className = `project ${props.currentProject === projectName ? "active-project" : ''}`
        return <li 
                    key={projectName}
                    className={className} 
                    data-project-name={projectName}
                    onClick={() => handleProjectClick(projectName)}
                    >{projectName}
                </li>
    }

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
                    {defaultProjectListElems}
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