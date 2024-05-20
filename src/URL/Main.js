import React from 'react'
import Hashy from './Hashy'
import Test from './Test'

const initialState = {
  d: -1,
}

export default function HashyMain() {
  return <div>
    <Hashy
      defaultContext={initialState}
      defaultState='one'
      transition={{
        one: ['two'],
        two: ['three'],
        three: ['one']
      }}
      verbose={true}
    >
      <Test />
    </Hashy>
  </div>
}