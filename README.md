# React Catalyst

Finite-State-Machines for React


## Coded FSM

Uses:
```
  <States name="whatever" setup={()=>{}} teardown={()=>{}}>
    <State
      default={true}
      element={<Idle />}
      name="IDLE"
      start={() => console.log('Entering IDLE')}
      end={() => console.log('Exiting IDLE')}
      transitions={['RUNNING']}
    />
    
    <State
      name="RUNNING"
      start={async() => console.log('Entering RUNNING')}
      end={() => console.log('Exiting RUNNING')}
      transitions={['IDLE']}
    >
      Loading stuff
    </State>
  </States>
```

State names, transitions, and transition start/update/end handlers are defined in code.
There are also handlers for FSM setup/teardown.
These handlers are tied to component lifecycle events so, in development, they fire when useEffect fires (i.e. TWICE).

In the example code:
* Buttons are disabled if that state transition isn't valid.
* These machines default to the IDLE state.
* The IDLE state element is a component whereas the others are hard-coded- the benefit of the import (instead of direct children) is that they are injected with the helper functions.

These helpers are injected into the children of States:
  available('STATE-NAME') => returned whether that transition to that state is valid [from the current state]
  machine => name of the enclosing state machine
  state => name of the current state
  transition('STATE-NAME') => transition to the named state [if valid]

If a State has a defined element prop then that element is rendered in it's place and injecte4d with the helpers (like react-router).