import React from 'react'
import { useHREF } from './HREFContext'


export default function Controls() {
  const {push, query, state} = useHREF()
  
  
  return <>
    <ul>
      <li>
        <a href="#A">Test A</a>
      </li>

      <li>
        <a href="#B">Test B</a>
      </li>

      <li>
        <a href="#C">Test C</a>
      </li>
    </ul>
    
    <button onClick={E=>push({a:1})}>One</button>
    <button onClick={E=>push({a:2})}>Two</button>
    <button onClick={E=>push({a:3})}>Three</button>
    
    state: {state}
    
    <pre>
      {JSON.stringify(query, null, 2)}
    </pre>
  </>
}
