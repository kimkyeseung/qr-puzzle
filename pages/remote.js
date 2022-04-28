import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import HowToPlay from 'components/remote/HowToPlay'
import Controller from 'components/remote/Controller'
import Footer from 'components/Footer'
import styles from 'styles/Remote.module.css'

export default function Remote() {
  const router = useRouter()
  const [started, setStarted] = useState(false)

  const onDevelopment = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    const gameId = router.query['game-id']
    if (gameId) {
      axios.get(`/api/start/${gameId}`)
    }
  }, [router.query])

  const handleStartGame = useCallback(() => {
    setStarted(true)
  }, [])

  return (
    <div className={styles.container}>
      {started ? <Controller /> : <HowToPlay onStartGame={handleStartGame} />}
      <Footer />
    </div>
  )
}
