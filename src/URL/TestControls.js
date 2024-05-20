import React from 'react'
import { useHashyContext } from './hashyContext'


export default function TestControls() {
  const {available, state} = useHashyContext()


  return <div>
    <hr />
    Current state: {state}
    <br />
    {available('one')? <a href="#one?b=asdf">State 1</a>: <em>State 1</em>}
    &nbsp;
    {available('two')? <a href="#two?a=1234">State 2</a>: <em>State 2</em>}
    &nbsp;
    {available('three')? <a href="#three?c=flarn">State 3</a>: <em>State 3</em>}
    <hr />
  </div>
}
