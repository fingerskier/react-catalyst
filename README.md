# React Catalyst

Finite-State-Machines for React


## Finite State-Machine Component

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
* The IDLE state element is a component whereas the others are hard-coded- the benefit of passing the `Element` (instead of direct children) is that they are injected with the helper functions.

These helpers are injected into all children of `States`:
  available('STATE-NAME') => returns `true` if a transition to that state is valid **from the current state**
  machine => name of the enclosing state machine
  state => name of the current state
  transition('STATE-NAME') => transition to the named state **if valid**


## Hashy

Hashy is a simple URL state manager.
It uses the URL hash and query parameters, via a React context, to manage state.
The hash portion, between the `#` and the `?` (or end) of the URL is the current state name.
The query parameters, after the '?', get parsed into an object which is available via useHashyContext.
There is a `setParm` function, in the context, which allows adding a query parameter with a value.
There is also a `setVar` function which allows adding a state variable- this is for complex values or values that shouldn't trigger URL change.

If a `transitions` array is provided to the `<Hashy />` then state transitions are constrained thereby.
A transition from no state (the current-state is undefined by default) is always valid.
You can check whether a transition is valid by calling `available('state-name')`- which is available from `useHashyContext`.

If you don't check availability and try and try an invalid transition then Hashy goes back to the current state
In this case you will trigger a hash-change (re-render) and lose the URL query string but the context object doesn't change.

It is advisable to always set the `defaultState` property of `<Hashy />`.


Example:
```
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
    <MainComponent />
  </Hashy>
```