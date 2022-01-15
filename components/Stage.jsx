import React from 'react'
import styled from 'styled-components'

const StageWrapper = styled.div``

const Stage = ({ stage }) => {
  return (
    <StageWrapper>
      <div className="stage-number">{stage}</div>
    </StageWrapper>
  )
}

export default React.memo(Stage)
