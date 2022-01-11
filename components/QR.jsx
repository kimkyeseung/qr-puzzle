import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode'

const baseUrl = typeof location !== 'undefined' ? location.host : ''

const QR = ({ url, ...props }) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    QRCode.toCanvas(ref.current, `${baseUrl}/api/${url}`, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }

      console.log('success!')
    })
  }, [])

  return (
    <Wrapper {...props}>
      {ready || <div>LOADING...</div>}
      <canvas ref={ref}></canvas>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

export default QR
