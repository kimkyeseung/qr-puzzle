import React, {
  useRef,
  useMemo,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import QRCode from 'qrcode'
import qs from 'qs'

const { host } = useContext(GameContext)

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

  const qr = useMemo(() => (url ? `${host}/${url}` : String(value)), [])
  const qrType = useMemo(() => (url ? 'url' : 'choice'), [url])

  useEffect(() => {
    QRCode.toCanvas(ref.current, qr, (error) => {
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
