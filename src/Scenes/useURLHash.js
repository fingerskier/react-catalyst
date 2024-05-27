import {useEffect, useState} from 'react'


export default function useURLHash() {
  const [hash, setHash] = useState(window.location.hash)


  const link = (state, vars, overwrite=false)=>{
    // 'overwrite' indicates that the existing query is wiped prior to setting new values
    // by default the existing query is preserved and vars will add or modify them
    // passing a var with a null value will remove it from the query string
    let parm = overwrite? vars: parse()
    let target = (state || (state === ''))
      ? state
      : window.location.hash.substring(1).split('?')[0]
    
    console.log('LINK', state, target)
    if (vars) {
      for (let key in vars) {
        parm[key] = vars[key]
        
        if (vars[key] === null) {
          delete parm[key]
        }
      }
    }
    
    return `#${target}${stringify(parm)}`
  }


  const parse = ()=>{
    const search = window.location.hash.substring(1).split('?')[1]
    
    if (!search) return {}
    
    return search.split('&').reduce((acc,el)=>{
      const [key,value] = el.split('=')
      acc[key] = value
      return acc
    },{})
  }


  const stringify = (params)=>{
    return '?' + Object.keys(params).map(key=>`${key}=${params[key]}`).join('&')
  }


  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    }
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, []);
  
  
  return {
    hash: hash.replace('#', ''),
    link,
    parse,
    stringify,
  }
}