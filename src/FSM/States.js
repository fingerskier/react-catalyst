import React, {useEffect, useState} from 'react'


export default function States({
  children,
  setup,
  teardown,
}) {
  const [state, setState] = useState()


  const available = stateName => {
    // return true if the current state's transitions array contains 'stateName'
    return React.Children.toArray(children)
    .find(child=>child.props.name === state)
    .props.transitions?.includes(stateName)
  }


  const transition = (newState) => {
    if (available(newState) || !state) {
      setState(newState)
    }
  }


  useEffect(() => {
    if (setup) setup()
    
    return () => {
      if (teardown) teardown()
    }
  }, [])


  // loop over the children and return the child that matches the current state
  const contents = React.Children.toArray(children)
  .map(child=>{
    // if the child is not a <State /> tag then just return it
    if (child.type.name === 'State') {
      if (child.props.name === state) {
        // inject the 'transition' prop into the child
        const result = React.cloneElement(child, {
          available: available,
          state: state,
          transition: transition,
        })
        
        return result
      }
    } else {
      const result = React.cloneElement(child, {
        available: available,
        state: state,
        transition: transition,
      })
      return result
    }
  })


  return contents
}
