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

    href: (state,vars)=>{
      let result = ['#', state]
      
      if (vars) {
        result.push('?')
        
        for (let key in vars) {
          result.push(key + '=' + vars[key])
        }
      }
      
      return result.join('')
    },

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


  const hashChangeHandler = event=>{
    const desiredHash = window.location.hash.substring(1).split('?')
    const [hash,search] = desiredHash
    
    if (verbose) console.log('Hashy hashChangeHandler', hash, search, currentHash.current, transition)
    
    if (transition) {
      if (verbose) console.log('Hashy check transition from', currentState.current, 'to', hash)
      
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


  useEffect(() => {
    if (verbose) console.log('Hashy currentHash', currentHash.current)
  }, [currentHash])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy currentState', currentState.current)
  }, [currentState])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy defaultContext', defaultContext)
  }, [defaultContext])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy defaultState', defaultState)
  }, [defaultState])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy transition(s)', transition)
  }, [transition])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy is', verbose? 'IN VERBOSE MODE': null)
  }, [verbose])
  
  
  useEffect(() => {
    if (verbose) console.log('Hashy bootstrap')
    
    window.addEventListener('hashchange', hashChangeHandler)
    
    if (defaultState && !window.location.hash.length) {
      if (verbose) console.log('Hashy loading default state', defaultState)
      window.location = `#${defaultState}`
    }
    
    hashChangeHandler()
    
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])


  return <>
    {verbose? 'verbose mode ON': null}
    
    <HashyContext.Provider value={state}>
      {children}
    </HashyContext.Provider>
  </>
}