import { useState, useEffect, useMemo, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { io } from 'socket.io-client'
import QR from 'components/QR'
import styles from '../styles/Home.module.css'
import { uuid4 } from '@/lib/utils'

const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

export default function Home() {
  const gameId = useMemo(() => uuid4(), [])
  const [started, setStarted] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const socket = io()
    socket.on('start', (gameId) => {
      setStarted(true)
      setUser({
        gameId,
        startedAt: new Date().getTime(),
        life: 3
      })
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

      <main className={styles.main}>
        <h1 className={styles.title}>Let's play Game!</h1>

        <p className={styles.description}>
          Find the wrong <code className={styles.code}>QR code!</code>
        </p>

        <div className={styles.grid}>
          <QR url={`start/${gameId}`} data-tip="start" />
        </div>

        {started && <div>게임을 시작합니다!</div>}
      </main>

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
