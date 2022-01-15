export const uuid4 = () => {
  let d = new Date().getTime()

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const getRandomAnswerIndex = (count) => ~~(Math.random() * count)

export const levelGenerator = (level) => {
  let answer
  let extra
  let choicesCount
  let answerIndex = 0
  switch (level) {
    case 1:
      answer = ~~(Math.random() * 10)
      extra = ~~(Math.random() * 100)
      choicesCount = 5
      answerIndex = getRandomAnswerIndex(choicesCount)
      const choices = Array(choicesCount).fill(extra)
      choices[answerIndex] = answer
      return {
        answerIndex,
        choices
      }

    default:
      break
  }
  return
}
