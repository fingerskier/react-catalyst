import React from 'react'

export default function ControlPanel({available,state,transition}) {
  return <>
    <div>ControlPanel</div>

    <div>
      Current State: {state}
    </div>

    <button
      onClick={()=>transition('IDLE')}
      disabled={!available('IDLE')}
    >IDLE</button>
    <button
      onClick={()=>transition('LOADING')}
      disabled={!available('LOADING')}
    >LOADING</button>
    <button
      onClick={()=>transition('SUCCESS')}
      disabled={!available('SUCCESS')}
    >SUCCESS</button>
    <button
      onClick={()=>transition('ERROR')}
      disabled={!available('ERROR')}
    >ERROR</button>
  </>
}
