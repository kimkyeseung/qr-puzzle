import { useCallback, useEffect, useReducer, useMemo } from 'react'

const useActionQueue = (reducer, initialState) => {
  // dispatchQueue를 실행하면 queue에 action을 넣는다. 
  // 큐에 넣으면 실행? 큐에 넣고 delay 후 실행?
  useEffect(() => {
    const queue = []
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState)

  const dispatchQueue = useCallback(
    (action, delayTime = 1000) => {
      setTimeout(() => {
        dispatch(action)
      }, delayTime)
    },
    [dispatch]
  )

  return [state, dispatchQueue]
}

export default useActionQueue
