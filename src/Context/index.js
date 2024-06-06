import React from 'react'
import Controls from './Controls'
import Generic from './Generic'
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
      <Scene name="A">
        <TestA style={{border: 'thin solid red'}}>
          <div>TestA child</div>
          
          <Scene name="B">
            <Generic name='A/B' />
          </Scene>
        </TestA>
      </Scene>
      
      <Scene name="B" style={{border: 'thin solid red'}}>
        <div>Test B head</div>

        <Scene name="F">
          <Generic name='F' />
        </Scene>

        <Scene name="G">
          <Generic name='G' />
        </Scene>

        <div>Test B foot</div>
      </Scene>
      
      <Scene name="C">
        <TestC />
      </Scene>
      
      <Controls />
    </HREFProvider>
  </>
}