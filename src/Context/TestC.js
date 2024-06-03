import {useEffect} from 'react'
import {useHREF} from './HREFContext'


export default function TestC() {
  const {c, push} = useHREF()

  
  // useEffect(() => {
  //   const T = setInterval(() => {
  //     push({c: +c+1})
  //   }, 789)
    
  //   return () => {
  //     clearInterval(T)
  //   }
  // }, [])
  

  return <div>
    <h1> TestC </h1>
  </div>
}
