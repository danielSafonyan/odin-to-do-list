import React from 'react'

function Task(props) {

    function copyClickHandler(text) {
          navigator.clipboard.writeText(text);
    }

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
            <div className='task-interactions-container'><i class="fa-solid fa-paperclip"></i><i class="fas fa-copy" onClick={() => copyClickHandler(props.value)}></i></div>
        </div>
        )
}

export default Task