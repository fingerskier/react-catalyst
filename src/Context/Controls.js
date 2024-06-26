import React from 'react'
import { useHREF } from './HREFContext'


export default function Controls() {
  const {link, push, query, state} = useHREF()
  
  
  return <>
    <ul>
      <li> <a href={link('A')}>Test A</a> </li>
      <li> <a href={link(['A','B'])}>Test A/B</a> </li>
      <li> <a href="#B">Test B</a> </li>
      <li> <a href={link(['B','F'])}>Test B/F</a> </li>
      <li> <a href={link(['B','G'])}>Test B/G</a> </li>
      <li> <a href={link('C', {c:0})}>Test C</a> </li>
    </ul>
    
    <button onClick={E=>push({a:1})}>One</button>
    <button onClick={E=>push({a:2})}>Two</button>
    <button onClick={E=>push({a:3})}>Three</button>
    
    
    <pre>
      state: {state}&nbsp;
      {JSON.stringify(query, null, 2)}
    </pre>
  </>
}
