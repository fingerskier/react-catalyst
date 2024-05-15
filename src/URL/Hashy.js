import React, {useEffect, useState} from 'react'


export default function Hashy({
  children,
  verbose=false,
}) {
  const [state, setState] = useState()
  

  useEffect(() => {
    const hashChangeHandler = event=>{
      const [hash,search] = window.location.hash.substring(1).split('?')
      
      const newState = hash
      
      let context = search.split('&').reduce((acc,cur)=>{
        const [key,value] = cur.split('=')
        acc[key] = value
        return acc
      },{})
      
      setState(newState)
    }
    
    window.addEventListener('hashchange', hashChangeHandler)
    
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])


  return (
    <div>States</div>
  )
}