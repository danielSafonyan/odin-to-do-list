import React from 'react'

function Task(props) {
    return (
        <div className="task">
            <input 
            type="checkbox"
            id={props.id}
            checked={props.isDone}
            readOnly
            />
            <label 
            htmlFor={props.id}
            onClick={props.clickHandler}
            data-parent-project={props.parentProject}
            ><span 
            className="custom-checkbox" 
            data-parent-project={props.parentProject}
            ></span>{props.value}</label>
        </div>
        )
}

export default Task