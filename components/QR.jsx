import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode'
import axios from 'axios'

const baseUrl = typeof location !== 'undefined' ? `http://${location.host}` : ''

const QR = ({ url, onDevelopment, ...props }) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const targetUrl = `${baseUrl}/api/${url}`
    if (onDevelopment) {
      ref.current.addEventListener('click', () => {
        axios.get(targetUrl)
      })
    }
    QRCode.toCanvas(ref.current, targetUrl, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }
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
