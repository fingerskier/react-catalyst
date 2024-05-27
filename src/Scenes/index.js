import React from 'react'
import Controls from './Controls'
import Scene from './Scene'

import TestA from './TestA'
import TestB from './TestB'
import TestD from './TestD'

const verboseMode = false


export default function SceneTest() {
  return <div>
    <h2>Scenes Example</h2>
    
    
    <Scene>
      <Controls />
      
      <Scene hash='root1' verbose={verboseMode}>
        <h3>Scene root1</h3>
        
        <Scene hash='A' verbose={verboseMode}>
          <TestA />
        </Scene>
        
        <Scene element={<TestB/>} hash='B' verbose={verboseMode} />
      </Scene>
      
      <Scene hash='root2' verbose={verboseMode}>
        <h3>Scene root2</h3>
        
        <Scene hash='C' verbose={verboseMode}>
          <h3>Scene C</h3>
        </Scene>
        
        <Scene element={<TestD/>} hash='D' verbose={verboseMode} />
      </Scene>
    </Scene>
  </div>
}
