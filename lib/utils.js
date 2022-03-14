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
  let choices = []
  switch (level) {
    case 1:
      answer = ~~(Math.random() * 10)
      extra = ~~(Math.random() * 100)
      choicesCount = 5
      answerIndex = getRandomAnswerIndex(choicesCount)
      choices = Array(choicesCount).fill(extra)
      choices[answerIndex] = answer
      return {
        answerIndex,
        choices
      }

    case 2:
      answer = ~~(Math.random() * 1000)
      extra = ~~(Math.random() * 10000)
      choicesCount = 6
      answerIndex = getRandomAnswerIndex(choicesCount)
      choices = Array(choicesCount).fill(extra)
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

const timeLimter = (level) => {
  let isSpeedUp = false
  switch (level) {
    case 1:
      return { time: 5000, isSpeedUp }
    case 2:
      isSpeedUp = true
    case 3:
      return { time: 4000, isSpeedUp }
    case 4:
      isSpeedUp = true
    case 5:
    case 6:
      return { time: 3500, isSpeedUp }
    case 7:
      isSpeedUp = true
    case 8:
    case 9:
      return { time: 3000, isSpeedUp }
    case 10:
      isSpeedUp = true
    default:
      return { time: 2500, isSpeedUp }
  }
}

const optionCounter = (level) => {
  switch (level) {
    case 1:
      return 4
    case 2:
      return 5
    case 3:
    case 4:
      return 6
    case 5:
    case 6:
      return 8
    case 7:
    case 8:
    case 9:
      return 9
    default:
      return 12
  }
}

const randomeStringGenerator = (length) => {
  return Math.random().toString(36).substring(2, 13)
}

export function* levelGenerator2() {
  let level = 1

  while (true) {
    const { time, isSpeedUp } = timeLimter(level)
    const optionCount = optionCounter(level)
    const answerIndex = getRandomAnswerIndex(optionCount)
    const answer = ~~(Math.random() * 10)
    const extra = ~~(Math.random() * 100)
    const options = Array(optionCount).fill(extra)
    options[answerIndex] = answer
    yield {
      level,
      timeLimit: time,
      isSpeedUp,
      optionCount,
      answerIndex,
      options
    }
    level += 1
  }
}
