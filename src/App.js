import State from './State'
import States from './States'


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
        transitions={{ startLoading: 'LOADING' }}
      />
      <State
        name="LOADING"
        start={() => console.log('Entering LOADING')}
        end={() => console.log('Exiting LOADING')}
        transitions={{ success: 'SUCCESS', error: 'ERROR' }}
      />
      <State
        name="SUCCESS"
        start={() => console.log('Entering SUCCESS')}
        end={() => console.log('Exiting SUCCESS')}
        transitions={{ reset: 'IDLE' }}
      />
      <State
        name="ERROR"
        start={() => console.log('Entering ERROR')}
        end={() => console.log('Exiting ERROR')}
        transitions={{ retry: 'LOADING', reset: 'IDLE' }}
      />
    </States>
  </>
}

export default App;
