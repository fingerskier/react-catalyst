import React, {useEffect, useReducer, useRef, useState} from 'react'
import HashyContext, {action, reducer} from './hashyContext'


/**
 * 
 * @param {Array} transition: {from: to<Array:String>}
 * @returns 
 */
export default function Hashy({
  children,
  defaultContext={},
  defaultState={},
  transition,
  verbose=false,
}) {
  const [state, setState] = useReducer(reducer, {
    available: nextState=>transition?.[currentState.current]?.includes(nextState),

    setParm: (key,val)=>{
      const result = `${key}=${val}`
      
      if (verbose) console.log('Hashy setting URL parm', key, val)
      
      if (window.location.hash.includes(result)) return
      
      if (window.location.hash.includes('?')) {
        window.location += '&' + result
      } else {
        window.location += '?' + result
      }
    },
    
    setVar: (key,val)=>{
      if (verbose) console.log('Hashy setting var', key, val)
      
      const payload = {}
      payload[key] = val
      
      setState({
        type: action.SET,
        payload: payload,
      })
    },

    ...defaultContext,
  })

  const currentHash = useRef('')
  const currentState = useRef()


  useEffect(() => {
    const hashChangeHandler = event=>{
      const desiredHash = window.location.hash.substring(1).split('?')
      const [hash,search] = desiredHash
      
      
      if (transition) {
        let validTransition = true

        // if there is a registered transition from the currentState to the hashed state then proceed
        if (!currentState.current) {
          validTransition = true
          if (verbose) console.log('Hashy transitioning from VOID to', hash)
        } else if (transition?.[currentState.current]?.includes(hash)) {
          validTransition = true
          if (verbose) console.log('Hashy transitioning from', currentState.current, 'to', hash)
        } else {
          if (verbose) console.error('Hashy: no registered transition from', currentState.current, 'to', hash)
          validTransition = false
        }
        
        if (!validTransition) {
          console.log('HASHY CURRENT HASH', currentHash.current)
          window.location = `#${currentState.current}`
          return
        }
      }

      
      if (verbose) console.log('Hashy parsing', hash, search)
      
      let context = {}
      
      if (search) search.split('&').forEach(el=>{
        const [key,value] = el.split('=')
        context[key] = value
      },{})
      
      context.state = hash
      context.search = search
      
      setState({
        type: action.SET,
        payload: context,
      })
      
      currentHash.current = desiredHash
      currentState.current = hash
      
      if (verbose) console.log('Hashy goto', hash, desiredHash, context)
    }
    
    window.addEventListener('hashchange', hashChangeHandler)
    
    if (defaultState) {
      window.location = `#${defaultState}`
    } else {
      hashChangeHandler()
    }
    
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [defaultState])


  useEffect(() => {
    if (verbose) console.log('Hashy currentHash', currentHash.current)
  }, [currentHash])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy currentState', currentState.current)
  }, [currentState])


  return <>
    {verbose? 'verbose mode ON': null}
    
    <HashyContext.Provider value={state}>
      {children}
    </HashyContext.Provider>
  </>
}