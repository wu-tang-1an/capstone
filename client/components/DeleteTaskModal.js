import React from 'react'
import styles from './css/DeleteTaskModal.css'

const DeleteTaskModal = ({deleteTask, closeModal}) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.deleteMessage}>
        This action will remove any cards associated with the column.
      </div>
      <div className={styles.modalBtnsContainer}>
        <button type="button" className={styles.deleteBtn} onClick={deleteTask}>
          Delete Task
        </button>
        <button type="button" className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteTaskModal
