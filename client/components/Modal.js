import React, {useState} from 'react'
import styles from './Modal.css'

const Modal = (props) => {
  return (
    <div>
      <div className={styles.modalBackdrop}></div>
      <div className={styles.transparentBlockContainer}>
        <div className={styles.centeredModalBlock}>
          <div className={styles.modalTitleAndCloseBtn}>
            <div className={styles.modalTitle}>Delete Task</div>
            <div className={styles.closeModalBtn}>
              <span className="material-icons" /* onClick={handleCloseModal} */>
                close
              </span>
            </div>
          </div>
          <div className={styles.modalContent}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
