import {useEffect} from 'react'


export default function State({
  children,
  end,
  start,
}) {
  useEffect(() => {
    if (start) start()
    
    return () => {
      if (end) end()
    }
  }, [])


  return <>
    {children}
  </>
}