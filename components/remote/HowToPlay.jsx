import React, { useState } from 'react'
import QR from '../QR'
import styles from 'styles/Remote.module.css'

const HowToPlay = ({ onStartGame }) => {
  return (
    <div>
      <h1 className={styles.title}>How To Play</h1>
      <div className={styles.description}>
        <ul>
          <li>There are several QR codes</li>
          <li>only one QR code is diffrent from others</li>
          <li>find and capture that</li>
        </ul>
      </div>

      <div className={styles.examples}>
        <QR value={1} />
        <QR value={1} />
        <QR value={1} />
        <QR value={2} />
      </div>

      <div className={styles.start}>
        <button onClick={onStartGame}>understand!</button>
      </div>
    </div>
  )
}

export default HowToPlay
