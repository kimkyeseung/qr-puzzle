import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode'

const QR = ({ url }) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    QRCode.toCanvas(ref.current, url, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }

      console.log('success!')
    })
  }, [])

  return (
    <Wrapper>
      {ready || <div>LOADING...</div>}
      <canvas ref={ref}></canvas>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default QR
