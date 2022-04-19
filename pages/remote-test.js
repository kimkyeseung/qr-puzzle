import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Remote from 'pages/remote'

export default function RemoteTest() {
  const router = useRouter()

  useEffect(() => {
    const gameId = router.query['game-id']
    if (gameId) {
      axios.get(`/api/start/${gameId}`)
    }
  }, [router.query])

  return (
    <Remote />
  )
}
