import { useState, useCallback, useEffect, useReducer, useMemo } from 'react'

const useActionQueue = (reducer, initialState) => {
  const [queue, setQueue] = useState([])
  const [pending, setPending] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const action = queue[0]
    if (action && pending === false) {
      setPending(true)
      dispatch(action)
      setTimeout(() => {
        setQueue((queue) => queue.slice(1))
        setPending(false)
      }, action.delay || 0)
    }
  }, [queue, pending])

  const dispatchQueue = useCallback(
    (action) => {
      setQueue((queue) => [...queue, action])
    },
    [dispatch]
  )

  return [state, dispatchQueue]
}

export default useActionQueue
