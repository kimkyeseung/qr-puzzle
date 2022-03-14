import { useCallback } from 'react'
import axios from 'axios'

const useSubmit = (gameId) => {
  const handleSubmit = useCallback(
    (choice, isCorrect) => axios.post(`/api/submit`, { gameId, choice, isCorrect }),
    []
  )

  return {
    handleSubmit
  }
}

export default useSubmit
