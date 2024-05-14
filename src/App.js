import ControlPanel from './v1/ControlPanel'
import State from './v1/State'
import States from './v1/States'

import logo from './logo.svg'
import './App.css'


function App() {
  return <>
    <h1>Catalyst</h1>
    
    <States>
      <State
        name="IDLE"
        start={() => console.log('Entering IDLE')}
        end={() => console.log('Exiting IDLE')}
        transitions={['LOADING']}
      >
        IDLE
      </State>
      
      <State
        name="LOADING"
        start={() => console.log('Entering LOADING')}
        end={() => console.log('Exiting LOADING')}
        transitions={['LOADING', 'ERROR', 'SUCCESS' ]}
      >
        LOADING
      </State>
      
      <State
        name="SUCCESS"
        start={() => console.log('Entering SUCCESS')}
        end={() => console.log('Exiting SUCCESS')}
        transitions={['IDLE']}
      >
        SUCCESS
      </State>
      
      <State
        name="ERROR"
        start={() => console.log('Entering ERROR')}
        end={() => console.log('Exiting ERROR')}
        transitions={['LOADING', 'IDLE']}
      >
        ERROR
      </State>
      
      <ControlPanel />
    </States>
  </>
}

export default App;
