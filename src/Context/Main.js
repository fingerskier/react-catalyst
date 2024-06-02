import React from 'react'
import { useHREF} from './HREFContext'


export default function Main() {
  const {state, query} = useHREF()
  
  return <>
    <h1>Main</h1>
    
  </>
}
