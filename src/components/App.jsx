import { useState } from 'react'
import '../styles.css'
import Navbar from './Navbar'
import Display from './Display'
import Datacard from './DataCard'

function App() {
  const [currentDC, setCurrentDC] = useState({})

  return (
    <>
      <h1>aMazin</h1>
      <Navbar 
        currentDC={currentDC}
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
