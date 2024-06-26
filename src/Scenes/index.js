import React from 'react'
import Controls from './Controls'
import Scene from './Scene'

import TestA from './TestA'
import TestB from './TestB'
import TestD from './TestD'
import TestG from './TestG'


const verboseMode = false


export default function SceneTest() {
  return <div>
    <h2>Scenes Example</h2>
    
    <p>This bit is outside of any Scene</p>
    
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
        
        <Scene hash='D' verbose={verboseMode}>
          <TestD />
        </Scene>
      </Scene>

      <Scene hash='G' element={<TestG />} />
    </Scene>
  </div>
}
