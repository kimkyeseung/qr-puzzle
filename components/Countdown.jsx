import React, { useEffect } from 'react'
import styles from '../styles/Component.module.css'

const Countdown = ({ seconds }) => {
  useEffect(() => {
    console.time('countdown')
    setTimeout(() => {
      console.timeEnd('countdown')
    }, seconds * 1000)
  }, [])

  return (
    <div className={styles['countdown-container']}>
      <div style={{ animationDuration: `${seconds}s` }} className={styles['countdown-bar']} />
    </div>
  )
}

export default Countdown
