import React, { useRef, useState, useEffect, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode'
import qs from 'qs'
import axios from 'axios'

const baseUrl = typeof location !== 'undefined' ? `http://${location.host}` : ''

const QR = ({ url, query, onDevelopment, ...props }) => {
  const ref = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const targetUrl = `${baseUrl}/${url}`
    QRCode.toCanvas(ref.current, targetUrl, (error) => {
      if (error) {
        console.error(error)
      } else {
        setReady(true)
      }
    })
  }, [])

  const handleClick = useCallback(() => {
    if (onDevelopment) {
      window.open(`${baseUrl}/${url}?${qs.stringify(query)}`)
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
