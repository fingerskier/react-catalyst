import React from 'react'

export default function Idle({
  transition,
}) {
  return <div>
    <button onClick={E=>transition('LOADING')}>Load</button>
  </div>
}
