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
      <div className="stage-number">
        Stage: <strong>{stage}</strong>
      </div>
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
