import {useEffect} from 'react'
import TestControls from './TestControls'
import TestOne from './TestOne'
import TestTwo from './TestTwo'
import TestThree from './TestThree'
import { useHashyContext } from './hashyContext'


export default function Test() {
  const {state} = useHashyContext()


  useEffect(() => {
    return () => {
      window.location = '#'
    }
  }, [])
  

  return <div>
    <h1>Hashy Test-Page</h1>

    <ul>
      Registered Transitions:

      <li>State 1 -> State 2</li>
      <li>State 2 -> State 3</li>
      <li>State 3 -> State 1</li>
    </ul>

    <TestControls />
    
    {state==='one'? <div>
      <TestOne />
    </div> : null}
    
    {state==='two'? <div>
      <TestTwo />
    </div> : null}
    
    {state==='three'? <div>
      <TestThree />
    </div>: null}
  </div>
}
