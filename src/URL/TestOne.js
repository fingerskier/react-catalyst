import React from 'react'
import { useHashyContext } from './hashyContext'


export default function TestOne() {
  const {state, a, b, c, d, setParm, setVar} = useHashyContext()

  return <div>
    State 1 controls<br/>
    A = {a} <br/>
    B = {b} <br/>
    C = {c} <br/>
    D = {d} <br/>
    <button onClick={E=>setParm('c', '111')}>Set URL Parm C to 111</button> <br/>
    <button onClick={E=>setVar('d', d+1)}>Increment state variable D</button>
  </div>
}
