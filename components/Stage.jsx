import React, { useState, useEffect, useContext, useMemo } from 'react'
import Countdown from './Countdown'
import { io } from 'socket.io-client'
import QR from 'components/QR'
import styles from '../styles/Stage.module.css'
import useSubmit from 'hooks/useSubmit'
import { GameContext } from '../pages/index'

const Stage = ({
  level,
  timeLimit,
  isSpeedUp,
  optionCount,
  life,
  answerIndex,
  options,
  handleCorrect,
  handleWrong
}) => {
  const [deadline, setDeadline] = useState(timeLimit)
  const { gameId, onDevelopment } = useContext(GameContext)
  const { handleSubmit } = useSubmit(gameId)

  const socket = useMemo(() => io(), [])

  useEffect(() => {
    const timeoutId = setInterval(() => {
      deadline ? setDeadline(0) : clearInterval(timeoutId)
    }, 5000)
    
    return () => clearInterval(timeoutId)
  }, [deadline])

  useEffect(() => {
    if (!deadline) {
      handleWrong()
    }
  }, [deadline])

  useEffect(() => {
    socket.on('wrong-answer', handleWrong)
    socket.on('correct-answer', handleCorrect)

    return () => {
      socket.removeAllListeners()
    }
  }, [level])

  return (
    <main className={styles.main}>
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-blue-600 w-full h-1 duration-5000 scale-x-0"></div>
      </div>
      <h1 className={styles.title}>
        Stage: <strong>{level}</strong>
      </h1>
      <div className={styles.container}>
        {options.map((option, index) => (
          <QR
            key={index}
            onDevelopment={onDevelopment}
            value={option}
            isCorrect={answerIndex === index}
            handleSubmit={handleSubmit}
          />
        ))}
      </div>
      
      <Countdown time={deadline} />
    </main>
  )
}

export default React.memo(Stage)
