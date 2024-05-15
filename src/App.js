import {useState} from 'react'
import FSM from './FSM'

import logo from './logo.svg'
import './App.css'


function App() {
  const [showFSM, setShowFSM] = useState(false)

  return <>
    <h1>Catalyst</h1>
    
    <button onClick={()=>setShowFSM(!showFSM)}>
      {showFSM ? 'Hide' : 'Show'} FSM
    </button>

    {showFSM ? <FSM /> : null}
  </>
}

export default App;
