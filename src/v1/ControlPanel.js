import React from 'react'

export default function ControlPanel({state,transition}) {
  return <>
    <div>ControlPanel</div>

    <div>
      Current State: {state}
    </div>

    <button onClick={() => transition('IDLE')}>IDLE</button>
    <button onClick={() => transition('LOADING')}>LOADING</button>
    <button onClick={() => transition('SUCCESS')}>SUCCESS</button>
    <button onClick={() => transition('ERROR')}>ERROR</button>
    
    
    
  </>
}
