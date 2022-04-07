import { useState, useEffect } from 'react'
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

  useEffect(() => {
    dispatch({ type: 'READY' })
    dispatch({ type: 'START_GAME', delay: 3000 })
    dispatch({ type: 'SET_NEXT_LEVEL' })
    dispatch({ type: 'SET_PLAYING', delay: 3000 })
  }, [])

  return (
    <div>
      {log.map((l, i) => (
        <div key={i}>{l.status} {l.time}</div>
      ))}
    </div>
  )
}
