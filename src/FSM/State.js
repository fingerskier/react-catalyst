import {useEffect} from 'react'


export default function State({
  children,
  end,
  machine='FSM',
  name,
  start,
  verbose=false,
}) {
  useEffect(() => {
    if (verbose) console.log(`State: ${machine}:${name} starting`)
    
    try {
      if (start) {
        if (start.toString().includes("async")) {
          (async () => {
            await start()
          })()
        } else {
          start()
        }
      }
    } catch (error) {
      console.error(`Error in ${machine}:${name} start:`, error)
    }
    
    return () => {
      if (verbose) console.log(`State: ${machine}:${name} ending`)
      
      try {
        if (end) {
          if (end.toString().includes("async")) {
            (async () => {
              await end()
            })()
          } else {
            end()
          }
        }
      } catch (error) {
        console.error(`Error in ${machine}:${name} end:`, error)
      }
    }
  }, [])


  return <>
    {children}
  </>
}