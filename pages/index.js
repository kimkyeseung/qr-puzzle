import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { io } from 'socket.io-client'
import Main from 'components/Main'
import Stage from 'components/Stage'
import Pending from 'components/Pending'
import PendingPrepare from 'components/pending/Prepare'
import styles from '../styles/Home.module.css'
import generator from '@/lib/levelGenerator'
import { uuid4 } from '@/lib/utils'
import useDelay from 'hooks/useDelay'

const levelGenerator = generator()

const initialState = {
  game: {
    level: 0,
    timeLimit: 0,
    isSpeedUp: false,
    optionCount: 0,
    answerIndex: null,
    options: []
  },
  user: {
    startedAt: null,
    life: 3
  },
  pending: {},
  status: 'ready'
}

const reducer = (state, action) => {
  console.log('reducer work', action.type)
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        status: 'playing',
        user: {
          ...state.user,
          startedAt: Date.now()
        },
        game: {
          ...state.game,
          ...levelGenerator.next().value
        }
      }
    case 'SET_NEXT_LEVEL':
      return {
        ...state,
        game: {
          ...state.game,
          level: action.gameLevel
        }
      }
    case 'SET_PENDING':
      return {
        ...state,
        status: 'pending',
        pending: {
          type: action.pendingType,
          time: action.pendingTime
        }
      }
    case 'INITIALIZE_GAME':
      return {
        ...state,
        status: 'ready'
      }
    default:
      return state
  }
}

const onDevelopment = process.env.NODE_ENV !== 'production'

export const GameContext = createContext({
  state: initialState,
  gameId: '',
  onDevelopment: false
})

const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

const Home = () => {
  const gameId = useMemo(() => uuid4(), [])

  const [state, dispatch] = useReducer(reducer, initialState)
  const { game, user, status, pending } = state
  const { delayDispatch } = useDelay(dispatch)

  const handleStartGame = useCallback(() => {
    dispatch({ type: 'SET_PENDING', pendingType: 'prepare', pendingTime: 3000 })
    delayDispatch({ type: 'START_GAME' }, 3000)
  }, [])

  useEffect(() => {
    const socket = io()
    socket.on('start', (gameId) => {
      handleStartGame()
    })

    return () => {
      socket.removeAllListeners('start')
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameContext.Provider value={{ gameId, state, onDevelopment }}>
        {(() => {
          switch (status) {
            case 'ready':
              return <Main />
            case 'pending':
              switch (pending.type) {
                case 'prepare':
                  return (
                    <PendingPrepare count={Math.ceil(pending.time / 1000)} />
                  )
                case 'speed-up':
                case 'correct-answer':
                case 'wrong-answer':
                default:
                  return <Pending pending={pending} />
              }
            case 'playing':
              return (
                <Stage
                  level={game.level}
                  timeLimit={game.timeLimit}
                  isSpeedUp={game.isSpeedUp}
                  optionCount={game.optionCount}
                  answerIndex={game.answerIndex}
                  options={game.options}
                />
              )
            case 'over':
              return <GameOver handleStart={handleStartGame} />
            default:
              return null
          }
        })()}
      </GameContext.Provider>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
      <Tooltip data-for="start">
        Scan this QR Code to start Game with your phone.
      </Tooltip>
    </div>
  )
}

export default Home
