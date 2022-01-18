import React from 'react'
import styled from 'styled-components'
import QR from 'components/QR'
import { levelGenerator } from '@/lib/utils'
import qs from 'qs'

const StageWrapper = styled.div``

const ChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const Stage = ({ stage, onDevelopment }) => {
  const { answerIndex, choices } = levelGenerator(stage)
  console.log(choices)
  return (
    <StageWrapper>
      <h1 className="text-3xl font-bold">
        Stage: <strong>{stage}</strong>
      </h1>
      <ChoiceWrapper>
        {choices.map((choice, index) => (
          <QR
            key={index}
            onDevelopment={onDevelopment}
            url={`submit/${choice}?${qs.stringify({
              correct: index === answerIndex ? 't' : 'f'
            })}`}
          />
        ))}
      </ChoiceWrapper>
    </StageWrapper>
  )
}

export default React.memo(Stage)
