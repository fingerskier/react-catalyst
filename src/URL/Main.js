import React from 'react'
import Hashy from './Hashy'
import Test from './Test'


export default function HashyMain() {
  return <div>
    <Hashy verbose={true}>
      <Test />
    </Hashy>
  </div>
}