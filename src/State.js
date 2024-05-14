import React from 'react';


export default function State ({ 
  children,
  name,
  start,
  update,
  end,
  transitions,
}) {
  React.useEffect(() => {
    if (start) start()
    
    return () => {
      if (end) end()
    }
  }, [start, end])
  
  return {children}
}