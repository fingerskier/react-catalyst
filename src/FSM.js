import React from 'react';
import Idle from './FSM/Idle'
import States from './FSM/States'
import State from './FSM/State'
import ControlPanel from './FSM/ControlPanel'
import stateData from './FSM/stateConfig'


export default function FSM() {
  return <>
    <div>
      State names, transitions, and transition start/update/end handlers are defined in code.
      There are also handlers for FSM setup/teardown
      Buttons are disabled if that state transition isn't valid.
      These machines default to the IDLE state.
      The IDLE state element is a component whereas the others are hard-coded- the benefit of the import (instead of direct children) is that they are injected with the helper functions.
    </div>

    <h2>FSM tag-based</h2>
    <p>These states are setup directly in JSX</p>
    
    <States
      name="Top Machine"
      setup={() => console.log('Top machine setup')}
      teardown={() => console.log('Top machine teardown')}
    >
      <State
        default={true}
        element={<Idle />}
        name="IDLE"
        start={() => console.log('Entering IDLE')}
        end={() => console.log('Exiting IDLE')}
        transitions={['LOADING']}
      />
      
      <State
        name="LOADING"
        start={async() => console.log('Entering LOADING')}
        end={() => console.log('Exiting LOADING')}
        transitions={['LOADING', 'ERROR', 'SUCCESS' ]}
      >
        Loading stuff
      </State>
      
      <State
        name="SUCCESS"
        start={() => console.log('Entering SUCCESS')}
        end={async() => console.log('Exiting SUCCESS')}
        transitions={['IDLE']}
      >
        Successful load
      </State>
      
      <State
        name="ERROR"
        start={() => console.log('Entering ERROR')}
        end={() => console.log('Exiting ERROR')}
        transitions={['LOADING', 'IDLE']}
      >
        Loading error
      </State>
      
      <ControlPanel />
    </States>

    <hr />

    <h2>FSM data-driven</h2>
    <p>This state machine configuration is pulled from a POJO</p>
    
    <States>
      {stateData.map((state, i) => (
        <State
          default={state.default}
          key={i}
          name={state.name}
          start={() => console.log(`Entering ${state.name}`)}
          end={() => console.log(`Exiting ${state.name}`)}
          transitions={state.transitions}
        >
          {state.name}
        </State>
      ))}
      
      <ControlPanel />
    </States>
  </>
}
