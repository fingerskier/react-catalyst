import React, {useEffect, useState} from 'react'


export default function States({
  children,
  name='FSM',
  setup,
  teardown,
  verbose=false,
}) {
  const [state, setState] = useState()


  const available = stateName => {
    // return true if the current state's transitions array contains 'stateName'
    const validTransition = React.Children.toArray(children)
    .find(child=>child.props.name === state)
    .props.transitions?.includes(stateName)

    const stateless = !state

    return stateless || validTransition
  }


  const transition = (newState) => {
    if (available(newState) || !state) {
      setState(newState)
    }
  }


  useEffect(() => {
    if (verbose) console.log(`FSM: ${name} starting`)
    
    try {
      if (setup) {
        if (setup.toString().includes("async")) {
          (async () => {
            await setup()
          })()
        } else {
          setup()
        }
      }
    } catch (error) {
      console.error(`Error in ${name} setup:`, error)
    }
    
    return () => {
      if (verbose) console.log(`FSM: ${name} ending`)
      
      try {
        if (teardown) {
          if (teardown.toString().includes("async")) {
            (async () => {
              await teardown()
            })()
          } else {
            teardown()
          }
        }
      } catch (error) {
        console.error(`Error in ${name} teardown:`, error)
      }
    }
  }, [])


  // loop over children, return child matching the current state
  const contents = React.Children.toArray(children)
  .map(child=>{
    if (child.type.name === 'State') {
      const element = child.props.element? child.props.element : child
      
      if (!state && child.props.default) {
        const result = React.cloneElement(element, {
          available: available,
          machine: name,
          state: state,
          transition: transition,
        })
        
        setState(child.props.name)
        
        return result
      } else if (child.props.name === state) {
        const result = React.cloneElement(element, {
          available: available,
          machine: name,
          state: state,
          transition: transition,
        })
        
        return result
      }
    } else {
      // return any child that is not a <State />
      const result = React.cloneElement(child, {
        available: available,
        machine: name,
        state: state,
        transition: transition,
      })
      return result
    }
  })


  return contents
}
