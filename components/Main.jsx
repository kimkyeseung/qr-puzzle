import React, { useMemo } from 'react'
import QR from 'components/QR'
import styles from '../styles/Home.module.css'
import { uuid4 } from '@/lib/utils'

const Main = () => {
  const gameId = useMemo(() => uuid4(), [])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Let's play Game!</h1>

      <p className={styles.description}>
        Find the wrong <code className={styles.code}>QR code!</code>
      </p>

      <div className={styles.grid}>
        <QR url={`start/${gameId}`} data-tip="start" />
      </div>
    </main>
  )
}

export default Main
