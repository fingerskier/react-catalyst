import React, { useReducer, useEffect, useRef } from 'react';


const STATES = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const ACTIONS = {
  SET_STATE: 'SET_STATE',
  UPDATE: 'UPDATE',
};

const initialState = {
  currentState: STATES.IDLE,
  data: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, currentState: action.payload };
    case ACTIONS.UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const States = ({ children, update }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currRef = useRef()
  const prevRef = useRef()


  const transition = (newState) => {
    state.current.end()
    dispatch({ type: ACTIONS.SET_STATE, payload: newState });
    prevRef.current = state.currentState;
  }
  
  const updateState = (updates) => {
    dispatch({ type: ACTIONS.UPDATE, payload: updates });
  }


  prevRef.current = React.Children.toArray(children).find(
    (child) => child.props?.name === prevRef.current?.name
  )

  currRef.current = React.Children.toArray(children).find(
    (child) => child.props?.name === state.current?.name
  )


  return (
    <div>
      {prevRef.current && React.cloneElement(prevRef.current, {
        end: prevRef.current.props.end,
      })}

      {currRef.current && React.cloneElement(currRef.current, {
        runUpdate: true,
        start: currRef.current.props.start,
        transition: transition,
        update: currRef.current.props.update,
      })}
    </div>
  );
};

export default States;
