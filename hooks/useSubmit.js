import { useCallback } from 'react'
import axios from 'axios'

const useSubmit = (gameId) => {
  const handleSubmit = useCallback(
    (choice) => axios.post(`/api/submit`, { gameId, choice }),
    []
  )

  return {
    handleSubmit
  }
}

export default useSubmit
