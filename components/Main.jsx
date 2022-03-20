import React, { useContext } from 'react'
import QR from 'components/QR'
import { GameContext } from '../pages/index'
import styles from '../styles/Home.module.css'

const Main = () => {
  const { onDevelopment, gameId } = useContext(GameContext)

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Let's play Game!</h1>

      <p className={styles.description}>
        Find the wrong <code className={styles.code}>QR code!</code>
      </p>

      <div className={styles.grid}>
        <QR
          url={'remote'}
          query={{ 'game-id': gameId }}
          data-tip="start"
          onDevelopment={onDevelopment}
        />
      </div>
    </main>
  )
}

export default Main
