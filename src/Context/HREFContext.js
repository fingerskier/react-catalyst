import React, { createContext, useContext, useEffect, useState } from 'react';

const currentHash = ()=>window.location.hash.substring(1)
const HREFContext = createContext();
const parseQuery = queryString=>{
  const params = {}
  const queryParts = (queryString[0] === '?' ? queryString.slice(1) : queryString)
    .split('&');
  
  queryParts.forEach(part => {
      const [key, value] = part.split('=').map(decodeURIComponent);
      if (params[key]) {
          params[key] = [].concat(params[key], value);
      } else {
          params[key] = value;
      }
  });
  
  return params

}


export const useHREF = () => useContext(HREFContext)


export const HREFProvider = ({ children }) => {
  const [query, setQuery] = useState({})
  const [state, setState] = useState(currentHash)
  
  const push = (params, override = false)=>{
    const searchParams = new URLSearchParams(override ? '' : window.location.search)
    
    Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
    })
    
    const newQueryString = searchParams.toString()
    window.history.replaceState({}, '', `${window.location.pathname}?${newQueryString}${window.location.hash}`)
    setQuery(parseQuery(newQueryString))
  }
  
  
  useEffect(() => {
    const handleHashChange = () => {
      setState(currentHash)
      setQuery(parseQuery(window.location.search))
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    handleHashChange()
    
    return () => {
        window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  
  useEffect(() => {
    console.log(`<HREF> new state: ${state}`)
  }, [state])
  
  
  useEffect(() => {
    console.log(`<HREF> new query: ${JSON.stringify(query)}`)
  }, [query])
  
  
  const context = {
    push,
    query,
    state,
  }
  
  return (
    <HREFContext.Provider value={context}>
      {children}
    </HREFContext.Provider>
  )
}


export const Scene = ({ parent, name, children, element }) => {
  const {state} = useHREF()
  
  const fullName = parent? `${parent}/${name}`: name
  
  const shouldRender = state.startsWith(fullName)
  
  console.log(`<Scene> /${parent}/${name} ~ ${fullName} shouldRender: ${shouldRender}`)


  const render = (stuff,parm)=>React.Children.map(stuff, child => {
    if ( !React.isValidElement(child)) return child
    
    if (child.type === Scene) parm[name] = name
    
    return React.cloneElement(child, { 
      ...parm,
      parent: fullName,
    })
  })
  
  const result = []

  if (shouldRender) {
    if (element) result.push(render(element, {name: name}))
    
    if (children) result.push(render(children))
  }
  
  return result
}