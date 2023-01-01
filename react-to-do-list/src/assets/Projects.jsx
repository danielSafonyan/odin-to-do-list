import React from 'react'

function Projects() { 
    return (
         <div className="all-tasks">
            <div className="inboxes">
                <ul className="project-list">
                    <li className="project active-project" id="all-tasks">All Tasks</li>
                </ul>
            </div>
            <div className="projects">
                <h2 className="project-list-title">My Projects</h2>
            <ul className="dynamic project-list">
                <li className="project" id="programming">Programming</li>
                <li className="project active-project" id="spanish">Spanish</li>
                <li className="project" id="health-&-fitness">Health & Fitness</li> 
            </ul>
            <form action="" id="create-project" autocomplete="off">
                <input 
                type="text"
                className="new list"
                placeholder="new project name"
                aria-label="new project name"
                required name="project"/>
                <button  className="btn create" aria-label="create new project" type="button">+</button>
            </form>
            </div>
        </div>
        )
}

export default Projects