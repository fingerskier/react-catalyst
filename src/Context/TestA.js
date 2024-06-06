import React from 'react'
import {Scene, useHREF} from './HREFContext'


function TestAD({name, parent}) {
  const {state} = useHREF()
  
  return <div>
    <h3>TestAD content</h3>
    
    This component should show twice, once as an <em>element</em> and once as a <em>child</em>.
    <br />
    state: {state}
    <br />
    parent: {parent}
    <br />    
    {name? <>
      As an element prop it has a name of <em>{name}</em> injected.
    </>
    : <>
      As a child component it receives no name.
    </>}
  </div>
}


export default function TestA({name}) {
  return <div>
    <h1> TestA | {name} </h1>
    
    <a href="#A/D">show my D</a>
    
    <Scene name="D" parent={name} Element={<TestAD/>}>
      <div>
        This bare markup within the 'D' Scene.
      </div>
      
      <TestAD />
    </Scene>
  </div>
}