import { useState, useEffect, useCallback } from 'react'
import useActionQueue from 'hooks/useActionQueue'
import LifePoints from '@/components/LifePoints'
import styles from 'styles/Home.module.css'

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
  const [life, setLife] = useState(3)
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

  const loseLife = useCallback(() => {
    setLife((life) => life - 1)
  }, [])

  return (
    <div className={styles.container}>
      {/* {log.map((l, i) => (
        <div key={i}>
          {l.status} {l.time}
        </div>
      ))}
 */}
      <LifePoints remain={life} />
      <button onClick={loseLife}>life - 1</button>
    </div>
  )
}
