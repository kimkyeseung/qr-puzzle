import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { io } from 'socket.io-client'
import Main from 'components/Main'
import Stage from 'components/Stage'
import Pending from 'components/Pending'
import styles from '../styles/Home.module.css'

const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

export default function Home() {
  const [user, setUser] = useState(null)
  const [stage, setStage] = useState(0)
  const [pending, setPending] = useState(false)

  const onDevelopment = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    const socket = io()
    socket.on('start', (gameId) => {
      setPending(true)
      setUser({
        gameId,
        startedAt: new Date().getTime(),
        life: 3
      })
    })

    socket.on('submit', (correct) => {
      if (correct === 't') {
        console.log('correct')
      } else {
        console.log('wrong')
      }
    })

    return () => {
      socket.removeAllListeners('start')
    }
  }, [])

  const handleStartGame = useCallback((stage = 1) => {
    setStage(stage)
    setTimeout(() => {
      setPending(false)
    }, 1000)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {pending ? <Pending handleStart={handleStartGame} /> : null}
      {stage === 0 ? (
        <Main onDevelopment={onDevelopment} />
      ) : (
        <Stage onDevelopment={onDevelopment} stage={stage} />
      )}

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
