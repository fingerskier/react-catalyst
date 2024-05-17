import {createContext, useContext} from 'react'

const HashyContext = createContext()


export const action = {
  SET: 'SET',
  DELETE: 'DELETE',
}


export function reducer(state, data) {
  switch (data.type) {
    case action.SET: {
      return {
        ...state,
        ...data.payload,
      }
    }
    
    case action.DELETE: {
      const newState = {...state}
      delete newState[data.payload]
      return newState
    }
    
    default: {
      return state
    }
  }
}


export function useHashyContext() {
  return useContext(HashyContext)
}


export default HashyContext