import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PendingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  z-index: 2;
`

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
    <PendingWrapper>{count ? <p>{count}</p> : <h1>GO!</h1>}</PendingWrapper>
  )
}

export default Pending
