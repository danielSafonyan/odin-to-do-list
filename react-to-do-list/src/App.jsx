import { useState } from 'react'
import Projects from './assets/Projects'
import Todos from './assets/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div id='container'>
    <Projects />
    <Todos />
  </div>
  )
}

export default App
