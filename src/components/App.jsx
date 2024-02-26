import { useState } from 'react'
import '../styles.css'
import Navbar from './Navbar'
import Display from './Display'
import Datacard from './DataCard'

function App() {
  const [display, setDisplay] = useState('display all');

  return (
    <>
      <h1>app.jsx</h1>
      <Navbar />
      <Display 
        display={display}
        setDisplay={setDisplay}
      />
    </>
  )
}

export default App
