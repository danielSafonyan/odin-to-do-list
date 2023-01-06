import { useState, useEffect } from 'react'
import Projects from './assets/Projects'
import Todos from './assets/Todos'

function App() {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('cache')) || {'All Tasks' : {}, 'For Today': {}})
  const [currentProject, setCurrentProject] = useState('All Tasks')

  useEffect(() => localStorage.setItem('cache', JSON.stringify(data)), [data])
  
  function getAllTasks() {
      const allTasks = []
      Object.values(data).forEach(el => {
        allTasks.push(Object.values(el))
      })
      return allTasks.flat()
  }

  const taskList = currentProject === 'All Tasks' ? getAllTasks() : Object.values(data[currentProject])

  return (
          <div id='container'>
            <Projects 
                projectList={Object.keys(data)}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                setData={setData}
            />
            <Todos 
                taskList={taskList}
                currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            setData={setData}
            />
          </div>
  )
}

export default App
