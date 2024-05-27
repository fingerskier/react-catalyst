import React from 'react'
import useHash from './useURLHash'


export default function Controls({link}) {
  const {hash} = useHash()


  return <div>
    <div>Current hash: {hash}</div>

    <ul>
      <li>
        <a href={link('')}>Home</a>
      </li>

      <li>
        <a href={link('root1', {one:123})}>root1</a>
      </li>

      <li>
        <a href={link('root1/A')}>root1/A</a>
      </li>

      <li>
        <a href={link('root1/B')}>root1/B</a>
      </li>

      <li>
        <a href={link('root2', {one:'234'})}>root2</a>
      </li>

      <li>
        <a href={link('root2/C')}>root2/C</a>
      </li>

      <li>
        <a href={link('root2/D')}>root2/D</a>
      </li>
    </ul>
  </div>
}
