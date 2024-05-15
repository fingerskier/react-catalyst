import React from 'react';
import States from './FSM/States'
import State from './FSM/State'
import ControlPanel from './FSM/ControlPanel'


export default function FSM() {
  return <>
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
