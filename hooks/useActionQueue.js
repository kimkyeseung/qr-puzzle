import { useState, useCallback, useEffect, useReducer } from 'react'

const useActionQueue = (reducer, initialState) => {
  const [queue, setQueue] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const action = queue[0]
    if (action) {
      setTimeout(() => {
        dispatch(action)
        setQueue(queue.slice(1))
      }, action.delay || 0)
    }
  }, [queue])

  const dispatchQueue = useCallback(
    (action) => {
      setQueue((queue) => [...queue, action])
    },
    [dispatch]
  )

  return [state, dispatchQueue]
}

export default useActionQueue
