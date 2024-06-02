/**
 * This react component only displays its children when the hash matches its name + its parent's name: #parent/child
 * This way you can lexically define states without messing with routers and singleton state handlers.
 * It also provides helper function to update the hash and query string.
 * It also parses and injects the quest-string variables into each child.
 */
import React, {useEffect, useState} from 'react'


const href = (state, vars, overwrite=false)=>{
  // 'overwrite' indicates that the existing query is wiped prior to setting new values
  // by default the existing query is preserved and vars will add or modify them
  // passing a var with a null value will remove it from the query string
  let parm, target
  
  const currentHash = window.location.hash.substring(1).split('?')[0] || ''
  
  
  if (overwrite) {
    parm = vars? vars: {}
  } else {
    parm = vars? vars: parseQuery()
  }
  
  if (vars) {
    for (let key in vars) {
      parm[key] = vars[key]
      
      if (vars[key] === null) {
        delete parm[key]
      }
    }
  }
  
  
  if (Array.isArray(state)) {
    target = state.join('/')
  } else if (state?.length) {
    target = state
    
    if (target.startsWith('...')) {
      target = currentHash + '/' + target.substring(3)
    } else {
      target = state
    }
  } else {
    // null state means we use the current hash
    target = currentHash
  }
  
  
  return `/#${target}${stringifyQuery(parm)}`
}


const parseQuery = ()=>{
  const search = window.location.hash.substring(1).split('?')[1]
  
  if (!search) return {}
  
  return search.split('&').reduce((acc,el)=>{
    const [key,value] = el.split('=')
    acc[key] = value
    return acc
  },{})
}


const goto = (state, parm)=>{
  setState(state)
  
  setTimeout(() => {
    setQuery(parm)
  }, 0)
}


const setState = (state='')=>{
  if (Array.isArray(state)) {
    window.location.hash = state.join('/')
  } else {
    window.location.hash = state
  }
}


const setQuery = (parm={})=>{
  window.location.search = Object.keys(parm).map(key=>`${key}=${parm[key]}`).join('&')
}


const stringifyQuery = (params)=>{
  return '?' + Object.keys(params).map(key=>`${key}=${params[key]}`).join('&')
}


export default function Scene({
  children,
  effect=()=>{},
  name,
  parentName,
  verbose=false,
}) {
  const fullName = parentName? `${parentName}/${name}`: name

  const [query, setQuery] = useState({})
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    const hashChangeHandler = event=>{
      const currentHash = window.location.hash.substring(1).split('?')[0]
      
      if (verbose) console.log('SCENE UPDATE', parentName, name, currentHash)
      setQuery(parseQuery())
      
      if (currentHash?.startsWith(fullName)) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    
    window.addEventListener('hashchange', hashChangeHandler)
    
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])


  useEffect(effect, [])


  const renderedChildren = React.Children.map(children, child=>{
    if (React.isValidElement(child)) {
      if (verbose) console.log('SCENE RENDER', parentName, name, query)

      if (child.type === React.Fragment) return React.cloneElement(child.props.children, {
        link: href,
        parentName: fullName,
        ...query,
      })
      else return React.cloneElement(child, {
        link: href,
        parentName: fullName,
        ...query,
      })
    } else {
      return child
    }
  })
  
  
  return visible? renderedChildren: null
}


export {
  goto,
  href,
  parseQuery,
  setState,
  setQuery,
  stringifyQuery,
}