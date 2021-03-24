import React from 'react'
import styles from './css/Modal.css'

const Modal = ({children}) => {
  return (
    <div>
      {/* opaque full-page backdrop */}
      <div className={styles.modalBackdrop}></div>
      {/* transparent full-page backdrop to situate modal content */}
      <div className={styles.transparentBlockContainer}>
        {/* view "window" for modal */}
        <div className={styles.centeredModalBlock}>
          {/* modal child component rendered here */}
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
