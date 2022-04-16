import React, { useContext } from 'react'
import QR from 'components/QR'
import { GameContext } from '../pages/index'
import styles from '../styles/Home.module.css'

const GameOver = ({ handleStart }) => {
  const { onDevelopment, gameId, state } = useContext(GameContext)
  const { level: score } = state.game
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Game Over!</h1>

      <p className={styles.description}>Try again?</p>

      <div className={styles.grid}>
        <QR
          url={'remote'}
          query={{ 'game-id': gameId }}
          data-tip="start"
          onDevelopment={onDevelopment}
        />
      </div>

      <p className={styles.score}>
        Your score: <span>{score}</span>
      </p>
    </main>
  )
}

export default GameOver
