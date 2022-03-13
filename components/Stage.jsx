import React, { useState, useEffect, useContext } from 'react'
import QR from 'components/QR'
import styles from '../styles/Stage.module.css'
import { levelGenerator } from '@/lib/utils'
import useSubmit from 'hooks/useSubmit'
import { GameContext } from '../pages'

const Stage = ({ pending, stage, onDevelopment }) => {
  const { answerIndex, choices } = levelGenerator(stage)
  const [deadline, setDeadline] = useState(5)
  const { gameId } = useContext(GameContext)
  const { handleSubmit } = useSubmit(gameId)

  useEffect(() => {
    if (pending) {
      return null
    }

    const timeoutId = setInterval(() => {
      if (deadline) {
        setDeadline(0)
      } else {
        console.log('111111111')
        clearInterval(timeoutId)
      }
    }, 5000)
    return () => clearInterval(timeoutId)
  }, [pending, deadline])

  useEffect(() => {
    if (!deadline) {
      console.log('done')
    }
  }, [deadline])

  return (
    <main className={styles.main}>
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-blue-600 w-full h-1 duration-5000 scale-x-0"></div>
      </div>
      <h1 className={styles.title}>
        Stage: <strong>{stage}</strong>
      </h1>
      <div className={styles.container}>
        {choices.map((choice, index) => (
          <QR
            key={index}
            onDevelopment={onDevelopment}
            value={choice}
            answerIndex={answerIndex}
            handleSubmit={handleSubmit}
          />
        ))}
      </div>
    </main>
  )
}

export default React.memo(Stage)
