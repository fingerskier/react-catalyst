import React from 'react'
import {useHREF} from './HREFContext'


export default function Generic({children, name, parent}) {
  const {state} = useHREF()
  
  
  return <div style={{border: 'thin solid red'}}>
    <h3>Component {`${parent}/${name}`}</h3>
    {children}
  </div>
}