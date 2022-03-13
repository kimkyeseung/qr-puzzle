import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Remote() {
  const router = useRouter()

  const onDevelopment = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    const gameId = router.query['game-id']
    axios.get(`/api/start/${gameId}`)
  }, [router.query])

  return <div>this is remote</div>
}
