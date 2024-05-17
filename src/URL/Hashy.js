import React, {useEffect, useReducer, useState} from 'react'
import HashyContext, {action, reducer} from './hashyContext'


export default function Hashy({
  children,
  verbose=false,
}) {
  const [state, setState] = useReducer(reducer, {
    setParm: (key,val)=>window.location+=`&${key}=${val}`
  })
  // TODO: setParm could be a little smarter: if the param already exists then update the state and location.search; and if there is no location.search then add with '?' instead of '&'


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