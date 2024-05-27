import React from 'react'
import Scene from './Scene'
import TestE from './TestE'


export default function TestD({link}) {
  return <>
    TestD

    <button
      onClick={() => window.location=link('...E')}
    >Goto TestE</button>

    <a href={link('...E')}>Goto E state</a>
    <a href={link('...F')}>Goto F state</a>


    <Scene hash='E' element={<TestE/>} />

    <Scene hash='F'>
      <div>Scene F</div>
    </Scene>
  </>
}
