import React, {useState} from 'react'
import styles from '../css/Slider.module.css'

const Slider = ({children}) => {
  return <div className={styles.sliderContainer}>{children}</div>
}

export default Slider
