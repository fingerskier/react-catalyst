import {useEffect} from 'react'


export default function State({
  children,
  end,
  name,
  start,
  transitions,
  update,
}) {
  useEffect(() => {
    start()
    
    return () => {
      end()
    }
  }, [])


  return <>
    {children}
  </>
}