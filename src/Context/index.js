import React from 'react'
import Controls from './Controls'
import TestA from './TestA'
import TestB from './TestB'
import TestC from './TestC'

import { HREFProvider, Scene } from './HREFContext'


export default function Context() {
  return <>
    <div>Context</div>
    
    <HREFProvider>
      <Scene name="A">
        <TestA />
      </Scene>
      
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