import React from 'react'
import {href} from './Scene'


export default function Controls() {
  return <div>
    <ul>
      <li>
        <a href={href('scene1', {a:1})}>Scene 1</a>
      </li>
      
      <li>
        <a href={href(['scene1','A'], {a:2})}>Scene 1A</a>
      </li>
      
      <li>
        <a href={href(['scene1','B'], {a:3})}>Scene 1B</a>
      </li>
      
      <li>
        <a href={href('scene2')}>Scene 2</a>
      </li>
      
      <li>
        <a href={href('scene2/A')}>Scene 2A</a>
      </li>
    </ul>
  </div>
}
