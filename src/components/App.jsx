import { useState } from 'react'
import '../styles.css'
import Navbar from './Navbar'
import Display from './Display'
import Datacard from './DataCard'

function App() {
  const [currentDC, setCurrentDC] = useState({})

  return (
    <>
      <h1>app.jsx</h1>
      <Navbar 
        setCurrentDC={setCurrentDC}
      />
      <Display 
        currentDC={currentDC}
        setCurrentDC={setCurrentDC}
      />
    </>
  )
}

export default App
