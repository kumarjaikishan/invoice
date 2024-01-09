import { useState } from 'react'
import './App.css'
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Home/>
        {/* <Sidebar/> */}
    </div>
  )
}

export default App
