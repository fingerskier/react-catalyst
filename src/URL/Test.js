import React from 'react'
import { useHashyContext } from './hashyContext'


export default function Test() {
  const {state, a, b, c, d, setParm, setVar} = useHashyContext()


  return <div>
    <h1>Hashy Test-Page</h1>

    <p>
      Hashy is a simple URL state manager. It uses the URL hash and query params to glearn the state.
      The hash is the current state's name.
      The query params are parsed in a 'state' object that is available to children via HashyContext.
      We can add to the state via a URL query parameter with the 'setParm' function which is available from `useHashyContext`.
      There is also a 'setVar' function available in `useHashyContext` which adds to the state without setting URL query parameters.

    </p>
    
    <a href="#one?b=asdf">State 1</a>
    &nbsp;
    <a href="#two?a=1234">State 2</a>

    <hr />
    Current state: {state}
    <hr />

    {state==='one'? <div>
      State 1 controls<br/>
      A = {a} <br/>
      B = {b} <br/>
      C = {c} <br/>
      D = {d} <br/>
      <button onClick={E=>setParm('c', '111')}>Set URL Parm C to 111</button> <br/>
      <button onClick={E=>setVar('d', d+1)}>Increment state variable D</button>
    </div> : null}

    {state==='two'? <div>
      State 2 controls<br/>
      A = {a} <br/>
      B = {b} <br/>
      C = {c} <br/>
      D = {d} <br/>
      <button onClick={E=>setParm('c', '222')}>Set URL Parm C to 222</button> <br/>
      <button onClick={E=>setVar('d', d+1)}>Increment state variable D</button>
    </div> : null}
  </div>
}
