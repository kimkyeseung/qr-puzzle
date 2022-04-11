import React from 'react'

import styles from 'styles/Home.module.css'

const LifePoints = ({ remain }) => (
  <div className={styles.life}>
    life <strong>0{remain}</strong>
  </div>
)

export default LifePoints
