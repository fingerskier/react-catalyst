import React, {useEffect, useReducer, useState} from 'react'
import HashyContext, {action, reducer} from './hashyContext'


export default function Hashy({
  children,
  defaultState={},
  verbose=false,
}) {
  const [state, setState] = useReducer(reducer, {
    setParm: (key,val)=>{
      function addObj(i,j) {
        const test = `${i}=${j}`
        if (window.location.includes(test)) {
          if (verbose) console.log('Hashy did not re-add a parm', key, val)
        } else {
        return test
      }
      }
      
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

    ...defaultState,
  })


  useEffect(() => {
    const hashChangeHandler = event=>{
      const [hash,search] = window.location.hash.substring(1).split('?')
      
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
      
      if (verbose) console.log('Hashy context', context)
    }
    
    window.addEventListener('hashchange', hashChangeHandler)
    
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