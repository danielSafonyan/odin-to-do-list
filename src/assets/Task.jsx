import React from 'react'

function Task(props) {

    console.log(props.isForToday)

    function copyClickHandler(text) {
          navigator.clipboard.writeText(text);
    }

    function toggleIsForToday(parentProject, taskId) {
        console.log("Toggling", taskId, "from", parentProject)
        props.setData(prev => {
            const newData = {...prev}
            if (parentProject !== 'For Today') {
                newData[parentProject][taskId].isForToday = !newData[parentProject][taskId].isForToday
            }
            return newData
        })
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
            <div className='task-interactions-container'>
                <i 
                    className={`fa-solid fa-paperclip ${props.isForToday ? "for-today" : ""}`}
                    onClick={() => toggleIsForToday(props.parentProject, props.id)}
                ></i>
                <i 
                    className="fas fa-copy" 
                    onClick={() => copyClickHandler(props.value)}
                ></i></div>
        </div>
        )
}

export default Task