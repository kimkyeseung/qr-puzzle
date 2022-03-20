import { useCallback } from 'react'

const useDelay = (dispatch) => {
  const delayDispatch = useCallback(
    (action, delayTime = 1000) => {
      setTimeout(() => {
        dispatch(action)
      }, delayTime)
    },
    [dispatch]
  )

  return { delayDispatch }
}

export default useDelay
