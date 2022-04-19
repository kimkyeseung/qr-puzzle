import React, { useState } from 'react'
import styles from 'styles/Remote.module.css'
import { QrReader } from 'react-qr-reader'

const Controller = () => {
  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text)
          }

          if (!!error) {
            console.info(error)
          }
        }}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default Controller
