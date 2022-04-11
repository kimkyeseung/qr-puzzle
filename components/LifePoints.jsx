import React, { useRef, useMemo, useEffect } from 'react'
import styles from 'styles/Home.module.css'

const LifePoints = ({ remain }) => {
  const ref = useRef()

  return (
    <div className={styles.life}>
      life{' '}
      <ul ref={ref}>
        <li>{remain}</li>
      </ul>
    </div>
  )
}

export default LifePoints
