import {useState} from 'react'
import FSM from './FSM'
import HashyMain from './URL/Main'
import SceneTest from './Scenes'
import SceneManagerTest from './SceneManager'

import './App.css'


function App() {
  const [showFSM, setShowFSM] = useState(false)
  const [showHashy, setShowHashy] = useState(false)
  const [showScene, setShowScene] = useState(false)
  const [showSM, setShowSM] = useState(false)


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
    
    
    <button onClick={()=>setShowScene(!showScene)}>
      {showScene ? 'Hide' : 'Show'} Scene
    </button>
    
    {showScene ? <SceneTest /> : null}
    
    
    <button onClick={()=>setShowSM(!showSM)}>
      {showSM ? 'Hide' : 'Show'} SM
    </button>
    
    {showSM ? <SceneManagerTest /> : null}
  </>
}

export default App;
