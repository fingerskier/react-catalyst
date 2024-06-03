import React from 'react'
import Controls from './Controls'
import TestA from './TestA'
import TestB from './TestB'
import TestC from './TestC'

import { HREFProvider, Scene } from './HREFContext'


export default function Context() {
  return <>
    <div>HREF Context Handler</div>

    <p>
      The intent here is to handle state via URL hash and context variables via URL query-string.
      This gives us a canonical way to handle state and context that is linkable.
    </p>
    
    <HREFProvider>
      <Scene name="A" element={<TestA/>} />
      
      <Scene name="B">
        <TestB />
      </Scene>
      
      <Scene name="C">
        <TestC />
      </Scene>
      
      <Controls />
    </HREFProvider>
  </>
}