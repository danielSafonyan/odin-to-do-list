import { useState, useEffect } from 'react'
import Projects from './assets/Projects'
import Todos from './assets/Todos'

const DEFAULT_PROJECTS = {
  ALL_TASKS : 'All Tasks',
  FOR_TODAY: 'For Today'
}

function App() {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('cache')) || {[DEFAULT_PROJECTS.ALL_TASKS] : {}, [DEFAULT_PROJECTS.FOR_TODAY]: {}})
  const [currentProject, setCurrentProject] = useState(DEFAULT_PROJECTS.ALL_TASKS)

  useEffect(() => localStorage.setItem('cache', JSON.stringify(data)), [data])
  
  function getAllTasks() {
      const allTasks = []
      Object.values(data).forEach(el => {
        allTasks.push(Object.values(el))
      })
      return allTasks.flat()
  }

  function getTasksForToday() {
    const allTasks = []
      Object.values(data).forEach(project => {
          Object.values(project).forEach(task => {
              if (task.isForToday) {
                allTasks.push(task)
              }
          })
      })
      return allTasks
}

  const taskList = currentProject === DEFAULT_PROJECTS.ALL_TASKS ? getAllTasks() : 
                   currentProject === DEFAULT_PROJECTS.FOR_TODAY ? getTasksForToday() :
  Object.values(data[currentProject])

  return (
          <div id='container'>
            <Projects 
                DEFAULT_PROJECTS={DEFAULT_PROJECTS}
                projectList={Object.keys(data)}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                setData={setData}
            />
            <Todos 
                DEFAULT_PROJECTS={DEFAULT_PROJECTS}
                taskList={taskList}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                setData={setData}
            />
          </div>
  )
}

export default App
