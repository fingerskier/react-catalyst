import React from 'react'
import Scene from './Scene'
import Controls from './Controls'
import OneA from './OneA'
import OneB from './OneB'


export default function SceneManagerTest() {
  return <div>
    SceneManagerTest

    <Controls />
    
    <Scene name='scene1' verbose={true}>
      Scene 1

      <Scene name='A' verbose={true}>
        <OneA />
      </Scene>

      <Scene name='B' verbose={true}>
        <OneB />
      </Scene>
    </Scene>

    <Scene name='scene2' verbose={true}>
      Scene 2

      <Scene name='A' verbose={true}>
        Scene 2A
      </Scene>
    </Scene>
  </div>
}
