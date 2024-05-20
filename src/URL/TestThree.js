import React from 'react'
import { useHashyContext } from './hashyContext'


export default function TestThree() {
  const {state, a, b, c, d, setParm, setVar} = useHashyContext()

  return <div>
    TestThree
  </div>
}
