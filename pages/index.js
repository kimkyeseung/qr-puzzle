import { useMemo, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import QR from 'components/QR'
import styles from '../styles/Home.module.css'
import { uuid4 } from '@/lib/utils'

const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

export default function Home() {
  const gameId = useMemo(() => uuid4(), [])

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
