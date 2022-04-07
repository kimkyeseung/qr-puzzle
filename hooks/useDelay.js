import { useCallback } from 'react'

const useDelay = (dispatch, queue) => {
  const delayDispatch = useCallback(
    (action, delayTime = 1000) => {
      setTimeout(() => {
        dispatch(action)
      }, delayTime)
    },
    [dispatch, queue]
  )

  return { delayDispatch }
}

export default useDelay
