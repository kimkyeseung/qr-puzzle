import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'


const Pending = ({ handleStart, count: countProp = 3 }) => {
  const [count, setCount] = useState(countProp)
  const countDownToStart = () => {
    setTimeout(() => {
      setCount(count - 1)
    }, 1000)
  }

  useEffect(() => {
    count ? countDownToStart() : handleStart()
  }, [count])

  return (
    <div className={styles.pending}>{count ? <p>{count}</p> : <h1>GO!</h1>}</div>
  )
}

export default Pending
