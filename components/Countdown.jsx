import React from 'react'
import styles from '../styles/Component.module.css'

const Countdown = ({ time }) => {

  return (
    <div className={styles['countdown-container']}>
      <div style={{ animationDuration: `${time / 1000}s` }} className={styles['countdown-bar']} />
    </div>
  )
}

export default Countdown
