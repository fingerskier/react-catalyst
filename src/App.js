import {useState} from 'react'
import FSM from './FSM'
import HashyMain from './URL/Main'

import logo from './logo.svg'
import './App.css'


function App() {
  const [showFSM, setShowFSM] = useState(false)
  const [showHashy, setShowHashy] = useState(false)

  return <>
    <h1>Catalyst</h1>
    
    <button onClick={()=>setShowFSM(!showFSM)}>
      {showFSM ? 'Hide' : 'Show'} FSM
    </button>

    {showFSM ? <FSM /> : null}

    <button onClick={()=>setShowHashy(!showHashy)}>
      {showHashy ? 'Hide' : 'Show'} Hashy
    </button>

    {showHashy ? <HashyMain /> : null}
  </>
}

export default App;
