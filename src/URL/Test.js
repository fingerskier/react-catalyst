import React from 'react'
import { useHashyContext } from './hashyContext'


export default function Test() {
  const {state, a, b, c, d, setParm, setC} = useHashyContext()


  return <div>
    <h1>Hashy Test-Page</h1>

    <p>
      Hashy is a simple URL state manager. It uses the URL hash and query params to glean the state.
      The hash is the current state's name.
      The query params are parsed in a 'state' object that is available to children via HashyContext.
      We can add to the state with 'setParm'
    </p>
    
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>

    <a href="#one?b=asdf">State 1</a>
    &nbsp;
    <a href="#two?a=1234">State 2</a>

    {state==='one'? <div>
      In state 1 <br/>
      A = {a} <br/>
      B = {b} <br/>
      C = {c} <br/>
      D = {d} <br/>
      <button onClick={E=>setParm('c', '111')}>Set C</button>
    </div> : null}


    {state==='two'? <div>
      In state 2 <br/>
      A = {a} <br/>
      B = {b} <br/>
      C = {c} <br/>
      D = {d} <br/>
      <button onClick={E=>setParm('c', '222')}>Set C</button>
    </div> : null}
  </div>
}
