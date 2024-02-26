import { useState } from 'react'
import '../styles.css'
import Navbar from './Navbar'
import Display from './Display'
import Datacard from './DataCard'

function App() {
  const [displayAll, setDisplayAll] = useState(true);
  const [currentDC, setCurrentDC] = useState({})

  return (
    <>
      <h1>app.jsx</h1>
      <Navbar 
        setDisplayAll={setDisplayAll}
        setCurrentDC={setCurrentDC}
      />
      <Display 
        displayAll={displayAll}
        setDisplayAll={setDisplayAll}
        currentDC={currentDC}
        setCurrentDC={setCurrentDC}
      />
    </>
  )
}

export default App
