import { useState, useEffect } from 'react'
import Projects from './assets/Projects'
import Todos from './assets/Todos'

function App() {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('cache')) || {'all-tasks' : {}})
  useEffect(function() {
    localStorage.setItem('cache', JSON.stringify(data))
  }, [data])
  const [currentProject, setCurrentProject] = useState('all-tasks')

  function getAllTasks() {
	const allTasks = []
	Object.values(data).forEach(el => {
		allTasks.push(Object.values(el))
	})
	return allTasks.flat()
  }
  const projectList = currentProject === 'all-tasks' ? getAllTasks() : Object.values(data[currentProject])
  return (
  <div id='container'>
    <Projects 
        projectList={Object.keys(data)}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setData={setData}
    />
    <Todos 
        taskList={projectList}
        currentProject={currentProject}
		setCurrentProject={setCurrentProject}
		setData={setData}
    />
  </div>
  )
}

export default App
