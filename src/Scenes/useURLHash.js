import {useEffect, useState} from 'react'


export default function useURLHash() {
  const [hash, setHash] = useState(window.location.hash)


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
    parse,
    stringify,
  }
}