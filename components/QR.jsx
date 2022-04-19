import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode'
import qs from 'qs'
import axios from 'axios'

const baseUrl = typeof location !== 'undefined' ? `http://${location.host}` : ''

const QR = ({
  url,
  query,
  onDevelopment,
  value,
  isCorrect,
  handleSubmit,
  ...props
}) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  const qr = useMemo(() => (url ? `${baseUrl}/${url}` : String(value)), [])
  const qrType = useMemo(() => (url ? 'url' : 'choice'), [url])

  useEffect(() => {
    QRCode.toCanvas(ref.current, qr, { version: 1 }, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }
    })
  }, [])

  const handleClick = useCallback(() => {
    if (onDevelopment) {
      qrType === 'url'
        ? window.open(`${baseUrl}/${url}?${qs.stringify(query)}`)
        : handleSubmit(value, isCorrect)
    }
  }, [url])

  return (
    <div onClick={handleClick} {...props}>
      {ready || <div>LOADING...</div>}
      <canvas ref={ref}></canvas>
    </div>
  )
}

export default QR
