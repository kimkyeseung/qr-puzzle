import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from 'styles/Pending.module.css'
import classnames from 'classnames'

const AnswerResult = ({ type }) => {
  const boxRef = useRef()
  useEffect(() => {
    if (type === 'correct') {
      gsap.from(boxRef.current, { scale: 0.8 })
    }

    if (type === 'wrong') {
      gsap.to('.letter', {
        scale: 0.1,
        y: 60,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 1,
        duration: 1,
        stagger: {
          amount: 1.5
        }
      })
    }
  })

  switch (type) {
    case 'correct':
      return (
        <div className={styles.pending}>
          <div className={classnames(styles.waviy)} ref={boxRef}>
            {'CORRECT'.split('').map((letter, i) => (
              <span key={i} style={{ '--i': i }}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      )

    case 'wrong':
      return (
        <div className={classnames(styles.pending)}>
          <div ref={boxRef}>
            {'WRONG'.split('').map((letter, i) => (
              <div key={i} className={classnames(styles.letter, 'letter')}>
                {letter}
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div ref={boxRef}></div>
  }
}

export default AnswerResult
