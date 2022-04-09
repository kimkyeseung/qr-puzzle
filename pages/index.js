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
import Ready from 'components/pending/Ready'
import styles from '../styles/Home.module.css'
import generator from '@/lib/levelGenerator'
import { uuid4 } from '@/lib/utils'
import useActionQueue from 'hooks/useActionQueue'

export const READY = 'READY'
export const START_GAME = 'START_GAME'
export const SET_NEXT_LEVEL = 'SET_NEXT_LEVEL'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const WRONG_ANSWER = 'WRONG_ANSWER'
export const INITIALIZE_GAME = 'INITIALIZE_GAME'

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
  delay: 0,
  status: 'main'
}

const reducer = (state, action) => {
  switch (action.type) {
    case READY:
      return {
        ...state,
        status: 'ready',
        delay: action.delay
      }

    case START_GAME:
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
    case CORRECT_ANSWER:
      return {
        ...state,
        status: 'correct-answer',
        delay: action.delay
      }
    case WRONG_ANSWER:
      return {
        ...state,
        status: 'wrong-answer',
        delay: action.delay
      }
    case SET_NEXT_LEVEL:
      return {
        ...state,
        status: 'playing',
        game: {
          ...state.game,
          ...levelGenerator.next().value
        }
      }
    case INITIALIZE_GAME:
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
  const [state, dispatch] = useActionQueue(reducer, initialState)
  const { game, user, status, delay } = state

  const handleStartGame = useCallback(() => {
    dispatch({ type: READY, delay: 3000 })
    dispatch({ type: START_GAME })
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

  const handleCorrectAnswer = useCallback(() => {
    dispatch({ type: CORRECT_ANSWER, delay: 2000 })
    dispatch({ type: SET_NEXT_LEVEL })
  }, [])

  const handleWrongAnswer = useCallback(() => {
    dispatch({ type: WRONG_ANSWER, delay: 2000 })
    dispatch({ type: SET_NEXT_LEVEL })
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
            case 'main':
              return <Main />
            case 'ready':
              return <Ready count={Math.ceil(delay / 1000)} />
            case 'speed-up':
              return <Ready count={Math.ceil(delay / 1000)} />
            case 'correct-answer':
              return <Ready count={Math.ceil(delay / 1000)} />
            case 'wrong-answer':
              return <Ready count={Math.ceil(delay / 1000)} />
            case 'playing':
              return (
                <Stage
                  level={game.level}
                  timeLimit={game.timeLimit}
                  isSpeedUp={game.isSpeedUp}
                  optionCount={game.optionCount}
                  answerIndex={game.answerIndex}
                  options={game.options}
                  handleCorrect={handleCorrectAnswer}
                  handleWrong={handleWrongAnswer}
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
