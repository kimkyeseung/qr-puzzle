import { useState, useEffect, useCallback } from 'react'
import useActionQueue from 'hooks/useActionQueue'

const initialState = {
  status: 'main'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'READY':
      return { status: 'ready' }
    case 'START_GAME':
      return { status: 'playing' }
    case 'SET_NEXT_LEVEL':
      return { status: 'pending' }
    case 'SET_PLAYING':
      return { status: 'playing' }
  }
}

export default function TestPage() {
  const [log, setLog] = useState([])
  const [state, dispatch] = useActionQueue(reducer, initialState)

  useEffect(() => {
    setLog([...log, { status: state.status, time: new Date().getSeconds() }])
  }, [state])

  const addAction = useCallback(() => {
    dispatch({ type: 'READY', delay: 1000 })
    dispatch({ type: 'START_GAME' })
  }, [])

  useEffect(() => {
    dispatch({ type: 'READY' })
    dispatch({ type: 'START_GAME' })
    dispatch({ type: 'SET_NEXT_LEVEL' })
    dispatch({ type: 'SET_PLAYING' })
  }, [])

  return (
    <div>
      {log.map((l, i) => (
        <div key={i}>
          {l.status} {l.time}
        </div>
      ))}
      <button onClick={addAction}>add action</button>
    </div>
  )
}
