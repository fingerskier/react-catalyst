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
  `available(stateName)` => returns `true` if a transition to that state is valid **from the current state**
  `machine`<String> => name of the enclosing state machine
  `state`<String> => name of the current state
  `transition('STATE-NAME')`<Function> => transition to the named state **if valid**


## Hashy

Hashy is a URL-hash-based finite state machine.
It uses the URL hash and query parameters, via a React context, to manage state.
The hash portion, between the `#` and the `?` (or end, if none) of the URL is the current state name.
The query parameters, after the '?', get parsed into the context object which is available via `useHashyContext`.

There are several helper function available from `useHashyContext`:
  `available(stateName)` => returns `true` if a transition to that state is valid **from the current state**
  `state`<String> => name of the current state
  `transition('STATE-NAME')`<Function> => transition to the named state **if valid**
  `href(stateName, queryObject)`<Function> => returns a URL-hash string based on stateName and queryObject
  `setParm(key, value)`<Function> => adds a query parameter to the URL
  `setVar(key, value)`<Function> => adds a state variable to the context


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
    <Main />
  </Hashy>


  function Main() {
    const { state } = useHashyContext()
    
    
    return <div>
      {state === 'home'? <Home /> : null}
      
      {state === 'aux'? <Aux /> : null}
      
      <hr />
      
      <Controls />
    </div>
  }


  function Home() {
    const { state, myVar, setParm } = useHashyContext()
    
    return <div>
      <h1>Current state is {state}</h1>
      
      <h3>myVar value is {myVar}</h3>
      
      <button
        onClick={() => setParm('myVar', 'myValue')}
      >
        Set myVar
      </button>
    </div>
  }
```


If a `transitions` array is provided to the `<Hashy />` then state transitions are constrained thereby.
A transition from no state (the current-state is undefined by default) is always valid.
You can check whether a transition is valid by calling `available('state-name')`- which is available from `useHashyContext`.

If you don't check availability and try and try an invalid transition then Hashy goes back to the current state
In this case you will trigger a hash-change (re-render) and lose the URL query string but the context object doesn't change.

If you set the `defaultState` property of `<Hashy />` then it will transition to that state upon loading unless another hash exists in the URL.
However, it is always valid to transition from the `null` state to any other state; i.e. without a default.
This allows for "deep" linking into your app.

You can control state access/setup/teardown via `useEffect`:

```
  function MyState() {
    useEffect(()=>{
      if (!authorized) window.location = href('home')
      
      return ()=> {
        // state exit logic
      }
    }, [])
  }
```